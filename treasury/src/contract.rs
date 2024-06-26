use crate::storage;
use crate::dependencies::pool::{Client as PoolClient, Request};
use sep_41_token::StellarAssetClient;
use soroban_sdk::{contract, contractclient, contractimpl, Address, Env, IntoVal, vec, Vec, Val, Symbol, panic_with_error};
use soroban_sdk::auth::{ContractContext, InvokerContractAuthEntry, SubContractInvocation};
use crate::errors::TreasuryError;

#[contract]
pub struct TreasuryContract;

#[contractclient(name="TreasuryClient")]
pub trait Treasury {

    /// Initialize the treasury
    ///
    /// ### Arguments
    /// * `admin` - The Address for the admin
    /// * `token` - The Address for the token
    /// * `blend_pool` - The Address for the blend pool
    ///
    fn initialize(e: Env, admin: Address, token: Address, blend_pool: Address);

    /// (Admin only) Set a new address as the admin of this pool
    ///
    /// ### Arguments
    /// * `new_admin` - The new admin address
    ///
    /// ### Panics
    /// If the caller is not the admin
    fn set_admin(e: Env, admin: Address);

    /// (Admin only) Increase the supply of the pool
    ///
    /// ### Arguments
    /// * `amount` - The amount to increase the supply by
    ///
    /// ### Panics
    /// If the caller is not the admin
    fn increase_supply(e: Env, amount: i128);

    /// (Admin only) Decrease the supply of the pool
    ///
    /// ### Arguments
    /// * `amount` - The amount to decrease the supply by
    ///
    /// ### Panics
    /// If the caller is not the admin
    /// If the supply is less than the amount
    fn decrease_supply(e: Env, amount: i128);

    /// Get token address
    fn get_token_address(e: Env) -> Address;

    /// Get blend address
    fn get_blend_address(e: Env) -> Address;
}

#[contractimpl]
impl Treasury for TreasuryContract {

    fn initialize(e: Env, admin: Address, token: Address, blend_pool: Address) {
        storage::extend_instance(&e);

        storage::set_admin(&e, &admin);
        storage::set_blend(&e, &blend_pool);
        storage::set_token(&e, &token);
        storage::set_token_supply(&e, &0);
    }

    fn set_admin(e: Env, new_admin: Address) {
        storage::extend_instance(&e);
        let admin = storage::get_admin(&e);
        admin.require_auth();
        new_admin.require_auth();

        storage::set_admin(&e, &new_admin);
        //e.events().publish(Symbol::new(e, "set_admin"), admin, new_admin);
    }

    fn increase_supply(e: Env, amount: i128) {
        storage::extend_instance(&e);
        let admin = storage::get_admin(&e);
        admin.require_auth();

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
        PoolClient::new(&e, &blend).submit(&e.current_contract_address(), &e.current_contract_address(), &e.current_contract_address(), &vec![
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

        //e.events().publish(Symbol::new(&e, "increase_supply"), admin);
    }

    fn decrease_supply(e: Env, amount: i128) {
        storage::extend_instance(&e);
        let admin = storage::get_admin(&e);
        admin.require_auth();

        let supply = storage::get_token_supply(&e);
        if supply < amount {
            panic_with_error!(&e, TreasuryError::SupplyError);
        }

        let token = storage::get_token(&e);
        let blend = storage::get_blend(&e);
        let pool_client = PoolClient::new(&e, &blend);
        
        let position = pool_client.get_positions(&e.current_contract_address()).supply;
        let position_amount = position.get(0).unwrap(); // Assuming the token indedx of the stable coin is 0
        if position_amount < amount {
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

        //e.events().publish(Symbol::new(&e, "decrease_supply"), admin);
    }

    fn get_token_address(e: Env) -> Address {
        storage::extend_instance(&e);
        storage::get_token(&e)
    }

    fn get_blend_address(e: Env) -> Address {
        storage::extend_instance(&e);
        storage::get_blend(&e)
    }
}
