use soroban_sdk::{self, contracterror};

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum PegkeeperError {
    AlreadyInitializedError = 1301,
    NotProfitable = 1302,
}