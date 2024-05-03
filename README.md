soroban keys add --secret-key orbit

soroban config network add  --rpc-url http://localhost:8000 --network-passphrase "Standalone Network ; February 2017" testnet

run makefile: `make`

find the contracts in ./target/wasm32-unknown-unknown/optimized/*.wasm

copy the to ./wasm 
`cp ./target/wasm32-unknown-unknown/optimized wasm`

also build the contracts from blend-contracts or download their release from github.

Deploy the contracts if you want and Then generate the ts bindings

Update the addresses to the correct deployments.
```sh
	soroban contract bindings typescript --overwrite --contract-id CAD3XSL3K4CIMQKQINQEGQEIZ7YRS2IGW4YAJT3DELZHZONQNSRHAGGE --wasm wasm/bridge-oracle.wasm --output-dir ./js/js-bridge-oracle/ --rpc-url https://soroban-testnet.stellar.org --network-passphrase "Standalone Network ; February 2017"

	soroban contract bindings typescript --overwrite --contract-id CASSZBBOABGMWH3A2NLMXRSACIFWEWOLOEO5U3F33SYZJTONFKDM7N5T --wasm ./target/wasm32-unknown-unknown/optimized/treasury.wasm --output-dir ./js/js-treasury/ --rpc-url https://soroban-testnet.stellar.org --network-passphrase "Standalone Network ; February 2017" --network Standalone

	soroban contract bindings typescript --overwrite --contract-id CCSBJVBJSQVRFHDW5ZY4LONANJHFKNH4MU5G2QQFJERVUEQY7AGF227M --wasm ./target/wasm32-unknown-unknown/optimized/treasury-factory.wasm --output-dir ./js/js-treasury-factory/ --rpc-url https://soroban-testnet.stellar.org --network-passphrase "Standalone Network ; February 2017" --network Standalone
```
