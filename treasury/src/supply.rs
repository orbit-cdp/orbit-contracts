use sep_41_token::StellarAssetClient;
use soroban_sdk::{Env, IntoVal, panic_with_error, Symbol, Val, Vec, vec};
use soroban_sdk::auth::{ContractContext, InvokerContractAuthEntry, SubContractInvocation};
use crate::dependencies::pool::Request;
use crate::errors::TreasuryError;
use crate::storage;



pub fn get_total_supply_blend(e: &Env) -> i128 {
    let blend = storage::get_blend(&e);
    let token = storage::get_token(&e);
    let balance = StellarAssetClient::new(&e, &token).get_balance(&blend);
    balance
}

///Increase the supply of the pool
///
/// ### Arguments
/// * `amount` - The amount to increase the supply by
pub fn increase_supply(e: &Env, amount: &i128) -> i128 {
    let token = storage::get_token(&e);
    let blend = storage::get_blend(&e);
    StellarAssetClient::new(&e, &token).mint(&e.current_contract_address(), &amount);
    let args: Vec<Val> = vec![
        &e,
        e.current_contract_address().into_val(&e),
        blend.into_val(&e),
        amount.into_val(&e),
    ];
    e.authorize_as_current_contract(vec![
        &e,
        InvokerContractAuthEntry::Contract(SubContractInvocation {
            context: ContractContext {
                contract: token.clone(),
                fn_name: Symbol::new(&e, "transfer"),
                args: args.clone(),
            },
            sub_invocations: vec![&e],
        })
    ]);
    crate::dependencies::pool::Client::new(&e, &blend).submit(&e.current_contract_address(), &e.current_contract_address(), &e.current_contract_address(), &vec![
        &e,
        Request {
            request_type: 0_u32, // SUPPLY RequestType
            address: token.clone(),
            amount,
        },
    ]);

    let supply = storage::get_token_supply(&e);
    let new_supply = supply + amount;
    storage::set_token_supply(&e, &new_supply);

    new_supply
}

///Decrease the supply of the pool
///
/// ### Arguments
/// * `amount` - The amount to decrease the supply by
///
/// ### Errors
/// * `TreasuryError::SupplyError` - If the supply is less than the amount
///
pub fn decrease_supply(e: &Env, amount: &i128) -> i128 {
    let supply = storage::get_token_supply(&e);
    if supply < amount.clone() {
        panic_with_error!(&e, TreasuryError::SupplyError);
    }

    let token = storage::get_token(&e);
    let blend = storage::get_blend(&e);
    let pool_client = crate::dependencies::pool::Client::new(&e, &blend);

    let position = pool_client.get_positions(&e.current_contract_address()).supply;
    let position_amount = position.get(0).unwrap(); // TODO: Find a way to find the index of the stablecoin
    if position_amount < amount.clone() {
        panic_with_error!(&e, TreasuryError::SupplyError);
    }

    pool_client.submit(&e.current_contract_address(), &e.current_contract_address(), &e.current_contract_address(), &vec![
        &e,
        Request {
            request_type: 1_u32, // WITHDRAW RequestType
            address: token.clone(),
            amount,
        },
    ]);
    let burn_args: Vec<Val> = vec![
        &e,
        e.current_contract_address().into_val(&e),
        amount.into_val(&e),
    ];
    e.invoke_contract::<Val>(&token, &Symbol::new(&e, "burn"), burn_args);
    let supply = storage::get_token_supply(&e);
    let new_supply = supply - amount;
    storage::set_token_supply(&e, &new_supply);

    new_supply
}