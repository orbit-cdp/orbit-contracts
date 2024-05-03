default: build

test: build
	cargo test --all --tests

build:
	cargo rustc --manifest-path=bridge-oracle/Cargo.toml --crate-type=cdylib --target=wasm32-unknown-unknown --release
	cargo rustc --manifest-path=treasury-factory/Cargo.toml --crate-type=cdylib --target=wasm32-unknown-unknown --release
	cargo rustc --manifest-path=treasury/Cargo.toml --crate-type=cdylib --target=wasm32-unknown-unknown --release

	mkdir -p target/wasm32-unknown-unknown/optimized
	soroban contract optimize --wasm target/wasm32-unknown-unknown/release/bridge_oracle.wasm --wasm-out target/wasm32-unknown-unknown/optimized/bridge-oracle.wasm
	soroban contract optimize --wasm target/wasm32-unknown-unknown/release/treasury_factory.wasm --wasm-out target/wasm32-unknown-unknown/optimized/treasury_factory.wasm
	soroban contract optimize --wasm target/wasm32-unknown-unknown/release/treasury.wasm --wasm-out target/wasm32-unknown-unknown/optimized/treasury.wasm
	
	cd target/wasm32-unknown-unknown/optimized/ && \
		for i in *.wasm ; do \
			ls -l "$$i"; \
		done

fmt:
	cargo fmt --all

clean:
	cargo clean

generate-js:
	soroban contract bindings typescript --overwrite --contract-id CAD3XSL3K4CIMQKQINQEGQEIZ7YRS2IGW4YAJT3DELZHZONQNSRHAGGE --wasm wasm/bridge-oracle.wasm --output-dir ./js/js-bridge-oracle/ --rpc-url https://soroban-testnet.stellar.org --network-passphrase "Standalone Network ; February 2017"

	soroban contract bindings typescript --overwrite --contract-id CBHNYJQ3GDJCNYKTPN3DTPYKZF4ZMMSEQY2IJFE4O5IMJ6GXYLN5HC3T --wasm ./target/wasm32-unknown-unknown/optimized/treasury.wasm --output-dir ./js/js-treasury/ --rpc-url https://soroban-testnet.stellar.org --network-passphrase "Standalone Network ; February 2017"

	soroban contract bindings typescript --overwrite --contract-id CB52HS33TBPKPAXW6Z52DZKUGV4GVCPA4UPWFLPHUQWFPL47IONV6UG4 --wasm ./target/wasm32-unknown-unknown/optimized/treasury_factory.wasm --output-dir ./js/js-treasury-factory/ --rpc-url https://soroban-testnet.stellar.org --network-passphrase "Standalone Network ; February 2017"
