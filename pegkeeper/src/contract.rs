use soroban_sdk::{contract, contractclient, contractimpl, vec, Address, Env, Symbol, Vec, Val, IntoVal};
use crate::storage;

#[contract]
pub struct PegKeeperContract;

#[contractclient(name = "PegkeeperClient")]
pub trait PegKeeper {

    fn initialize(e: Env, admin: Address, treasury: Address, amm: Address);

    fn liquidation_trade(e: Env, liquidation: Address);

    fn set_admin(e: Env, admin: Address);

    fn get_admin(e: Env) -> Address;
}

#[contractimpl]
impl PegKeeper for PegKeeperContract {
    fn initialize(e: Env, admin: Address, treasury: Address, amm: Address) {
        storage::extend_instance(&e);
        let token: Address = storage::get_token(&e); //TODO: Get token from treasury

        storage::set_treasury(&e, &treasury);
        storage::set_amm(&e, &amm);
        storage::set_token(&e, &token);
        storage::set_admin(&e, &admin);
    }

    fn liquidation_trade(e: Env, liquidation: Address) {
        //TODO: Liquidate and sell on AMM
        storage::extend_instance(&e);
        let token = storage::get_token(&e);
        let amm = storage::get_amm(&e);

    }

    fn set_admin(e: Env, new_admin: Address) {
        storage::extend_instance(&e);
        let admin = storage::get_admin(&e);
        admin.require_auth();
        new_admin.require_auth();

        storage::set_admin(&e, &new_admin);
        //e.events().publish(Symbol::new(e, "set_admin"), admin, new_admin);
    }

    fn get_admin(e: Env) -> Address {
        storage::extend_instance(&e);
        storage::get_admin(&e)
    }
}