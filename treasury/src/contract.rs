use crate::storage;
use crate::dependencies::pool::{Client as PoolClient, Request};
use sep_41_token::StellarAssetClient;
use soroban_sdk::{contract, contractclient, contractimpl, Address, Env, IntoVal, vec, Vec, Val, Symbol, symbol_short, token, panic_with_error};
use soroban_sdk::auth::{ContractContext, InvokerContractAuthEntry, SubContractInvocation};
use crate::errors::TreasuryError;
use token::Client as TokenClient;

const FLASH_LOAN: Symbol = symbol_short!("FLASHLOAN");

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
    fn initialize(e: Env, admin: Address, token: Address, blend_pool: Address, pegkeeper: Address);

    /// (Admin only) Set a new address as the admin of this pool
    ///
    /// ### Arguments
    /// * `new_admin` - The new admin address
    ///
    /// ### Panics
    /// If the caller is not the admin
    fn set_admin(e: Env, admin: Address);

    /// (Admin only) Set a new pegkeeper for the flashloan
    ///
    /// ### Arguments
    /// * `new_pegkeeper` - The new pegkeeper address
    ///
    /// ### Panics
    /// If the caller is not the admin
    fn set_pegkeeper(e: Env, new_pegkeeper: Address);

    /// (pegkeeper only) only regiestered pegkeeper can call this function and flashloan by using this function
    ///
    /// ### Arguments
    /// * `new_pegkeeper` - The new pegkeeper address
    ///
    /// ### Panics
    /// If the caller is not the pegkeeper
    fn flash_loan(e: Env, caller: Address, collateral_token: Address, liquidation: Address, amount: i128);

    /// (Admin only) Increase the supply of the pool
    ///
    /// ### Arguments
    /// * `amount` - The amount to increase the supply by
    ///
    /// ### Panics
    /// If the caller is not the admin
    fn increase_supply(e: Env, amount: i128);

    /// Get token address
    fn get_token_address(e: Env) -> Address;

    /// Get blend address
    fn get_blend_address(e: Env) -> Address;
}

#[contractimpl]
impl Treasury for TreasuryContract {

    fn initialize(e: Env, admin: Address, token: Address, blend_pool: Address, pegkeeper: Address){
        storage::extend_instance(&e);
        if storage::is_init(&e) {
            panic_with_error!(&e, TreasuryError::AlreadyInitializedError);
        }

        storage::set_admin(&e, &admin);
        storage::set_blend(&e, &blend_pool);
        storage::set_token(&e, &token);
        storage::set_pegkeeper(&e, &pegkeeper);
    }

    fn set_admin(e: Env, new_admin: Address) {
        storage::extend_instance(&e);
        let admin = storage::get_admin(&e);
        admin.require_auth();
        new_admin.require_auth();

        storage::set_admin(&e, &new_admin);
        //e.events().publish(Symbol::new(e, "set_admin"), admin, new_admin);
    }

    fn set_pegkeeper(e: Env, new_pegkeeper: Address) {
        storage::extend_instance(&e);
        let admin: Address = storage::get_admin(&e);
        admin.require_auth();
        // new_pegkeeper.require_auth();
        storage::set_pegkeeper(&e, &new_pegkeeper);
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

        //e.events().publish(Symbol::new(&e, "increase_supply"), admin);
    }

    fn flash_loan(e: Env, caller: Address, collateral_token: Address, liquidation: Address, amount: i128) {
        storage::extend_instance(&e);
        let pegkeeper: Address = storage::get_pegkeeper(&e);
        pegkeeper.require_auth(); //for args?
        //pegkeeper.require_auth_for_args((token.clone(), amount).into_val(&e),);


        let token: Address = storage::get_token(&e);
        let token_client = TokenClient::new(&e, &token);
        let balance_before: i128;
        let balance_after: i128;

        // Mint to pegkeeper
        let args_mint = vec![
            &e,
            e.current_contract_address().into_val(&e),
            pegkeeper.into_val(&e),
            amount.into_val(&e),
        ];
        e.authorize_as_current_contract(vec![
            &e,
            InvokerContractAuthEntry::Contract(SubContractInvocation {
                context: ContractContext {
                    contract: token.clone(),
                    fn_name: Symbol::new(&e, "mint"),
                    args: args_mint.clone(),
                },
                sub_invocations: vec![&e],
            })
        ]);
        e.invoke_contract::<Val>(&token, &Symbol::new(&e, "mint"), args_mint.clone());
        //get the balance before the flashloan
        balance_before = token_client.balance(&e.current_contract_address());
        let blend_address = storage::get_blend(&e);

        let pegkeeper_args = vec![
            &e,
            caller.into_val(&e),
            token.into_val(&e),
            collateral_token.into_val(&e),
            storage::get_blend(&e).into_val(&e),
            liquidation.into_val(&e),
            amount.into_val(&e),
        ];
        e.invoke_contract::<Val>(&pegkeeper, &Symbol::new(&e, "process_loan"), pegkeeper_args.clone());

        balance_after = token_client.balance(&e.current_contract_address());

        if balance_after >= balance_before + amount {
            e.events().publish((FLASH_LOAN, symbol_short!("flashloan")), (amount, 0));

            let args_burn: Vec<Val> = vec![
                &e,
                e.current_contract_address().into_val(&e),
                amount.into_val(&e),
            ];
            e.authorize_as_current_contract(vec![
                &e,
                InvokerContractAuthEntry::Contract(SubContractInvocation {
                    context: ContractContext {
                        contract: token.clone(),
                        fn_name: Symbol::new(&e, "burn"),
                        args: args_burn.clone(),
                    },
                    sub_invocations: vec![&e],
                })
            ]);
            e.invoke_contract::<Val>(&token, &Symbol::new(&e, "burn"), args_burn.clone());
        } else {
            panic_with_error!(&e, TreasuryError::FlashloanFailedError);
        }
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
