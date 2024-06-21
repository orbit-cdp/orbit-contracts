mod treasury_contract {
    soroban_sdk::contractimport!(
        file = "../wasm/treasury2.wasm"
    );
}

pub use treasury_contract::{Client as TreasuryClient, WASM as TREASURY_WASM};