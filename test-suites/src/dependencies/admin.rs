use soroban_sdk::{testutils::Address as _, Address, Env};
mod admin_contract {
    use admin::Asset;
    use admin::ReserveConfig;
    use admin::ReserveEmissionMetadata;

    soroban_sdk::contractimport!(file = "../wasm/orbit/admin.wasm");
}

pub use admin::{AdminClient, AdminContract, ReserveConfig, ReserveEmissionMetadata, Asset};

pub fn create_admin<'a>(e: &Env, wasm: bool) -> (Address, AdminClient<'a>) {
    let contract_id = Address::generate(e);
    if wasm {
        e.register_contract_wasm(&contract_id, admin_contract::WASM);
    } else {
        e.register_contract(&contract_id, AdminContract {});
    }
    (contract_id.clone(), AdminClient::new(e, &contract_id))
}