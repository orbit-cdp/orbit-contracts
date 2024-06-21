use soroban_sdk::{contract, contractclient, contractimpl, log, panic_with_error, token, Address, Env};
use crate::{errors::MockReceiverError, storage};
#[contract]
pub struct MockReceiverContract;

#[contractclient(name="MockReceiverClient")]
pub trait MockReceiver {
    /// Initialize the treasury
    ///
    /// ### Arguments
    /// * `admin` - The Address for the admin
    /// * `maximum_duration` - The maximum_duration for swap transaction
    fn initialize(e: Env, admin: Address);

    /// Execute operation
    ///
    /// ### Arguments
    /// * `caller` - The Address for the caller
    /// * `token_a` - The Address for the token received
    /// * `token_b` - The Address for the token to be swapped
    /// * `amount` - The Amount for the flashloan
    fn execute_operation(e: Env, caller: Address, token_a: Address, token_b: Address, amount: i128);
}

#[contractimpl]
impl MockReceiver for MockReceiverContract {
    fn initialize(e: Env, admin: Address) {
        storage::extend_instance(&e);

        if storage::is_init(&e) {
            panic_with_error!(&e, MockReceiverError::AlreadyInitializedError);
        }

        storage::set_admin(&e, &admin);
    }
    fn execute_operation(e: Env, caller: Address, token_a: Address, token_b: Address, amount: i128) {
        caller.require_auth();

        log!(&e, "================================= Receiveer Function Start ================================");
        /*
        let token_client = token::Client::new(
            &e,
            &token
        );

        // Perform liquidation & swap on blend & soroswap
        // ...
        
        let total_amount = amount + fee;
        
        token_client.approve(
            &e.current_contract_address(),
            &caller,
            &total_amount,
            &(e.ledger().sequence() + 1),
        );
        */
        log!(&e, "================================= Receiveer Function End ================================");
    }
}

