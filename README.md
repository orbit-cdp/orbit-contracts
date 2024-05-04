soroban keys add --secret-key orbit

soroban config network add  --rpc-url http://localhost:8000 --network-passphrase "Standalone Network ; February 2017" testnet

run makefile: `make`

find the contracts in ./target/wasm32-unknown-unknown/optimized/*.wasm

copy the to ./wasm 
`cp ./target/wasm32-unknown-unknown/optimized wasm`

also build the contracts from blend-contracts or download their release from github.

Deploy the contracts if you want and Then generate the ts bindings
```sh
root@DESKTOP:/mnt/d/orbit-utils/orbit-contracts# soroban contract deploy --network testnet --source-account orbit --wasm wasm/bridge-oracle.wasm --rpc-url https://soroban-testnet.stellar.org  --network-passphrase "Test SDF Network ; September 2015"
CAD3XSL3K4CIMQKQINQEGQEIZ7YRS2IGW4YAJT3DELZHZONQNSRHAGGE

root@DESKTOP:/mnt/d/orbit-utils/orbit-contracts# soroban contract deploy --network testnet --source-account orbit --wasm wasm/treasury.wasm --rpc-url https://soroban-testnet.stellar.org       --network-passphrase "Test SDF Ne
twork ; September 2015"
CBHNYJQ3GDJCNYKTPN3DTPYKZF4ZMMSEQY2IJFE4O5IMJ6GXYLN5HC3T

root@DESKTOP:/mnt/d/orbit-utils/orbit-contracts# soroban contract deploy --network testnet --source-account orbit --wasm wasm/treasury_factory.wasm --rpc-url https://soroban-testnet.stellar.org       --network-passphrase "Tes
t SDF Network ; September 2015"
CB52HS33TBPKPAXW6Z52DZKUGV4GVCPA4UPWFLPHUQWFPL47IONV6UG4
```



Update the addresses to the correct deployments.
```sh
	soroban contract bindings typescript --overwrite --contract-id CAD3XSL3K4CIMQKQINQEGQEIZ7YRS2IGW4YAJT3DELZHZONQNSRHAGGE --wasm wasm/bridge-oracle.wasm --output-dir ./js/js-bridge-oracle/ --rpc-url https://soroban-testnet.stellar.org --network-passphrase "Standalone Network ; February 2017"

	soroban contract bindings typescript --overwrite --contract-id CBHNYJQ3GDJCNYKTPN3DTPYKZF4ZMMSEQY2IJFE4O5IMJ6GXYLN5HC3T --wasm ./target/wasm32-unknown-unknown/optimized/treasury.wasm --output-dir ./js/js-treasury/ --rpc-url https://soroban-testnet.stellar.org --network-passphrase "Standalone Network ; February 2017"

	soroban contract bindings typescript --overwrite --contract-id CB52HS33TBPKPAXW6Z52DZKUGV4GVCPA4UPWFLPHUQWFPL47IONV6UG4 --wasm ./target/wasm32-unknown-unknown/optimized/treasury_factory.wasm --output-dir ./js/js-treasury-factory/ --rpc-url https://soroban-testnet.stellar.org --network-passphrase "Standalone Network ; February 2017"
```
