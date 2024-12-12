use soroban_sdk::{self, contracterror};

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum MockPegkeeperError {
    AlreadyInitializedError = 1501,
    NotProfitable = 1505,
}