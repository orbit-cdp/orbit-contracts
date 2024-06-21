#![cfg(test)]

use test_suites::{
    assertions::assert_approx_eq_abs,
    create_fixture_with_data,
    test_fixture::{TokenIndex, SCALAR_7},
};

#[test]
fn test_flash_loan() {
    let fixture = create_fixture_with_data();
    let frodo = fixture.users.get(0).unwrap();
    let henk = fixture.users.get(1).unwrap();

    let pool_fixture = &fixture.pools[0].pool;
    let amm = &fixture.pairs[0].pair;




}