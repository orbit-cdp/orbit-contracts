use soroban_sdk::{testutils::Address as _, Address, Env};

mod mock_treasury_contract {
    soroban_sdk::contractimport!(file = "../wasm/orbit/mock_treasury.wasm");
}

pub use mock_treasury::{MockTreasuryClient, MockTreasuryContract};

pub fn create_mock_treasury<'a>(e: &Env, wasm: bool) -> (Address, MockTreasuryClient<'a>) {
    let contract_id = Address::generate(e);
    if wasm {
        e.register_at(&contract_id, mock_treasury_contract::WASM, ());
    } else {
        e.register_at(&contract_id, MockTreasuryContract {}, ());
    }
    (contract_id.clone(), MockTreasuryClient::new(e, &contract_id))
}
