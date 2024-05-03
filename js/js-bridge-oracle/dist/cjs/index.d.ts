import { AssembledTransaction, ContractClient, ContractClientOptions } from '@stellar/stellar-sdk/lib/contract_client/index.js';
import type { u32, u64, i128, Option } from '@stellar/stellar-sdk/lib/contract_client';
export * from '@stellar/stellar-sdk';
export * from '@stellar/stellar-sdk/lib/contract_client/index.js';
export * from '@stellar/stellar-sdk/lib/rust_types/index.js';
export declare const networks: {
    readonly standalone: {
        readonly networkPassphrase: "Standalone Network ; February 2017";
        readonly contractId: "CAD3XSL3K4CIMQKQINQEGQEIZ7YRS2IGW4YAJT3DELZHZONQNSRHAGGE";
    };
};
/**
 * Price data for an asset at a specific timestamp
 */
export interface PriceData {
    price: i128;
    timestamp: u64;
}
/**
 * Asset type
 */
export type Asset = {
    tag: "Stellar";
    values: readonly [string];
} | {
    tag: "Other";
    values: readonly [string];
};
export declare const Errors: {};
export interface Client {
    /**
     * Construct and simulate a initialize transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    initialize: ({ from_asset, to_asset, oracle }: {
        from_asset: string;
        to_asset: string;
        oracle: string;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: BASE_FEE
         */
        fee?: number;
        /**
         * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
         */
        timeoutInSeconds?: number;
        /**
         * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
         */
        simulate?: boolean;
    }) => Promise<AssembledTransaction<null>>;
    /**
     * Construct and simulate a decimals transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    decimals: (options?: {
        /**
         * The fee to pay for the transaction. Default: BASE_FEE
         */
        fee?: number;
        /**
         * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
         */
        timeoutInSeconds?: number;
        /**
         * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
         */
        simulate?: boolean;
    }) => Promise<AssembledTransaction<u32>>;
    /**
     * Construct and simulate a lastprice transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    lastprice: ({ asset }: {
        asset: Asset;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: BASE_FEE
         */
        fee?: number;
        /**
         * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
         */
        timeoutInSeconds?: number;
        /**
         * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
         */
        simulate?: boolean;
    }) => Promise<AssembledTransaction<Option<PriceData>>>;
}
export declare class Client extends ContractClient {
    readonly options: ContractClientOptions;
    constructor(options: ContractClientOptions);
    readonly fromJSON: {
        initialize: (json: string) => AssembledTransaction<null>;
        decimals: (json: string) => AssembledTransaction<number>;
        lastprice: (json: string) => AssembledTransaction<Option<PriceData>>;
    };
}
