use soroban_sdk::{contract, contractclient, contractimpl, panic_with_error, Address, Env, vec, IntoVal, Val};
use soroban_sdk::xdr::ScValType::Symbol;
use crate::{
    balances, dependencies::{
        blend::{Client as BlendClient, Request}, 
        router::Client as SoroswapRouter, 
    },
    errors::PegkeeperError, storage
};

#[contract]
pub struct PegkeeperContract;

#[contractclient(name="PegkeeperClient")]
pub trait Pegkeeper {
    /// Initialize the treasury
    ///
    /// ### Arguments
    /// * `admin` - The Address for the admin
    /// * `maximum_duration` - The maximum_duration for swap transaction
    fn initialize(e: Env, admin: Address, router: Address);

    /// (Admin only) Set a new address as the admin of this pool
    ///
    /// ### Arguments
    /// * `new_admin` - The new admin address
    ///
    /// ### Panics
    /// If the caller is not the admin
    fn set_admin(e: Env, admin: Address);

    /// (Admin only) Add a new treasury for the flashloan
    ///
    /// ### Arguments
    /// * `new_token_address` - The new token address
    /// * `new_treasury` - The new pegkeeper address
    ///
    /// ### Panics
    /// If the caller is not the admin
    fn add_treasury(e: Env, new_token_address: Address, new_treasury: Address);

    /// Flash loan specific amount from specific treasury by using token address
    /// ### Arguments
    /// * `token_address` - The token address for flash loan
    /// * `amount` - The amount to flash loan
    ///
    /// ### Panics
    /// If there is no profit
    fn flash_loan(e: Env, caller: Address, token_address: Address, collateral_token: Address, liquidation: Address,  amount: i128);

    /// ### Arguments
    /// * `token_address` - The token address for flash loan
    /// * `tresury_address` - The treasury address for flash loan
    /// * `amount` - The amount to flash loan
    /// * `treasury_fee` - The fee of treasury
    ///
    /// ### Panics
    /// If there is no profit
    fn process_loan(e: Env, caller: Address, token_address: Address, swap_address: Address, blend_address: Address, liquidation_address: Address, amount: i128);
    
    /// Get token address
    fn get_treasury(e: Env, token_address: Address) -> Address;
}

#[contractimpl]
impl Pegkeeper for PegkeeperContract {
    fn initialize(e: Env, admin: Address, router: Address) {
        storage::extend_instance(&e);

        if storage::is_init(&e) {
            panic_with_error!(&e, PegkeeperError::AlreadyInitializedError);
        }

        storage::set_admin(&e, &admin);
        storage::set_router(&e, &router);
    }

    fn set_admin(e: Env, admin: Address) {
        storage::extend_instance(&e);
        let old_admin = storage::get_admin(&e);
        old_admin.require_auth();

        storage::set_admin(&e, &admin);
    }

    fn add_treasury(e: Env, new_token_address: Address, new_treasury: Address) {
        storage::extend_instance(&e);
        let admin = storage::get_admin(&e);
        admin.require_auth();

        storage::set_treasury(&e, new_token_address, &new_treasury);
    }

    fn get_treasury(e: Env, token_address: Address) -> Address {
        storage::extend_instance(&e);
        storage::get_treasury(&e, token_address)
    }

    fn flash_loan(e: Env, caller: Address, token_address: Address, collateral_token: Address, liquidation: Address,  amount: i128) {
        storage::extend_instance(&e);

        let treasury_address = storage::get_treasury(&e, token_address.clone());

        let treasury_loan_args = vec![
            &e,
            caller.into_val(&e),
            collateral_token.into_val(&e),
            liquidation.into_val(&e),
            amount.into_val(&e)
        ];
        e.invoke_contract::<Val>(&treasury_address, &soroban_sdk::Symbol::new(&e, "flash_loan"), treasury_loan_args);
    }

    fn process_loan(e: Env, caller: Address, token_address: Address, swap_address: Address, blend_address: Address, liquidation_address: Address, amount: i128) {
        storage::extend_instance(&e);

        let treasury_address = storage::get_treasury(&e, token_address.clone());
        treasury_address.require_auth();
        
        // Check balance of token of contract
        let balance_after = balances::get_balance(&e, token_address.clone());

        if balance_after < amount {
            panic_with_error!(&e, PegkeeperError::InsufficientBalance);
        }

        // Repay the flash loan amount + treasury fee to treasury
        balances::transfer_amount(&e, token_address, treasury_address, amount);
    }
    
}

