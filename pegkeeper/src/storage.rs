use sep_40_oracle::Asset;
use soroban_sdk::{Address, Env, Symbol};

pub(crate) const LEDGER_THRESHOLD_SHARED: u32 = 172800; // ~ 10 days
pub(crate) const LEDGER_BUMP_SHARED: u32 = 241920; // ~ 14 days


const TREASURY_KEY: &str = "Treasury";
const TOKEN_KEY: &str = "Token";
const AMM_KEY: &str = "Amm";
const ADMIN_KEY: &str = "Admin";

pub fn extend_instance(env: &Env) {
    env.storage()
        .instance()
        .extend_ttl(LEDGER_THRESHOLD_SHARED, LEDGER_BUMP_SHARED);
}

pub fn get_treasury(env: &Env) -> Address {
    env.storage()
        .instance()
        .get(&Symbol::new(env, TREASURY_KEY))
        .unwrap()
}

pub fn set_treasury(env: &Env, treasury: &Address) {
    env.storage()
        .instance()
        .set(&Symbol::new(env, TREASURY_KEY), treasury);
}

pub fn get_token(env: &Env) -> Address {
    env.storage()
        .instance()
        .get(&Symbol::new(env, TOKEN_KEY))
        .unwrap()
}

pub fn set_token(env: &Env, token: &Address) {
    env.storage()
        .instance()
        .set(&Symbol::new(env, TOKEN_KEY), token);
}

pub fn get_amm(env: &Env) -> Address {
    env.storage()
        .instance()
        .get(&Symbol::new(env, AMM_KEY))
        .unwrap()
}

pub fn set_amm(env: &Env, amm: &Address) {
    env.storage()
        .instance()
        .set(&Symbol::new(env, AMM_KEY), amm);
}

pub fn get_admin(env: &Env) -> Address {
    env.storage()
        .instance()
        .get(&Symbol::new(env, ADMIN_KEY))
        .unwrap()
}

pub fn set_admin(env: &Env, admin: &Address) {
    env.storage()
        .instance()
        .set(&Symbol::new(env, ADMIN_KEY), admin);
}
