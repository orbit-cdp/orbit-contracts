import { ContractSpec, Address } from '@stellar/stellar-sdk';
import { Buffer } from "buffer";
import {
  AssembledTransaction,
  ContractClient,
  ContractClientOptions,
} from '@stellar/stellar-sdk/lib/contract_client/index.js';
import type {
  u32,
  i32,
  u64,
  i64,
  u128,
  i128,
  u256,
  i256,
  Option,
  Typepoint,
  Duration,
} from '@stellar/stellar-sdk/lib/contract_client';
import { Result } from '@stellar/stellar-sdk/lib/rust_types/index.js';
export * from '@stellar/stellar-sdk'
export * from '@stellar/stellar-sdk/lib/contract_client/index.js'
export * from '@stellar/stellar-sdk/lib/rust_types/index.js'

if (typeof window !== 'undefined') {
    //@ts-ignore Buffer exists
    window.Buffer = window.Buffer || Buffer;
}


export const networks = {
  standalone: {
    networkPassphrase: "Standalone Network ; February 2017",
    contractId: "CB52HS33TBPKPAXW6Z52DZKUGV4GVCPA4UPWFLPHUQWFPL47IONV6UG4",
  }
} as const

export type TreasuryFactoryDataKey = {tag: "Contracts", values: readonly [string]};


export interface TreasuryInitMeta {
  pool_factory: string;
  treasury_hash: Buffer;
}

/**
 * Error codes for the pool factory contract. Common errors are codes that match up with the built-in
 * contracts error reporting. Pool factory specific errors start at 1300.
 */
export const Errors = {
  1: {message:""},
  3: {message:""},
  1300: {message:""}
}

export interface Client {
  /**
   * Construct and simulate a initialize transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  initialize: ({admin, treasury_init_meta}: {admin: string, treasury_init_meta: TreasuryInitMeta}, options?: {
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
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a deploy transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  deploy: ({salt, token_address, blend_pool}: {salt: Buffer, token_address: string, blend_pool: string}, options?: {
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
  }) => Promise<AssembledTransaction<string>>

  /**
   * Construct and simulate a set_admin transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  set_admin: ({new_admin}: {new_admin: string}, options?: {
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
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a is_treasury transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  is_treasury: ({treasury_id}: {treasury_id: string}, options?: {
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
  }) => Promise<AssembledTransaction<boolean>>

}
export class Client extends ContractClient {
  constructor(public readonly options: ContractClientOptions) {
    super(
      new ContractSpec([ "AAAAAgAAAAAAAAAAAAAAFlRyZWFzdXJ5RmFjdG9yeURhdGFLZXkAAAAAAAEAAAABAAAAAAAAAAlDb250cmFjdHMAAAAAAAABAAAAEw==",
        "AAAAAQAAAAAAAAAAAAAAEFRyZWFzdXJ5SW5pdE1ldGEAAAACAAAAAAAAAAxwb29sX2ZhY3RvcnkAAAATAAAAAAAAAA10cmVhc3VyeV9oYXNoAAAAAAAD7gAAACA=",
        "AAAAAAAAAAAAAAAKaW5pdGlhbGl6ZQAAAAAAAgAAAAAAAAAFYWRtaW4AAAAAAAATAAAAAAAAABJ0cmVhc3VyeV9pbml0X21ldGEAAAAAB9AAAAAQVHJlYXN1cnlJbml0TWV0YQAAAAA=",
        "AAAAAAAAAAAAAAAGZGVwbG95AAAAAAADAAAAAAAAAARzYWx0AAAD7gAAACAAAAAAAAAADXRva2VuX2FkZHJlc3MAAAAAAAATAAAAAAAAAApibGVuZF9wb29sAAAAAAATAAAAAQAAABM=",
        "AAAAAAAAAAAAAAAJc2V0X2FkbWluAAAAAAAAAQAAAAAAAAAJbmV3X2FkbWluAAAAAAAAEwAAAAA=",
        "AAAAAAAAAAAAAAALaXNfdHJlYXN1cnkAAAAAAQAAAAAAAAALdHJlYXN1cnlfaWQAAAAAEwAAAAEAAAAB",
        "AAAABAAAAKlFcnJvciBjb2RlcyBmb3IgdGhlIHBvb2wgZmFjdG9yeSBjb250cmFjdC4gQ29tbW9uIGVycm9ycyBhcmUgY29kZXMgdGhhdCBtYXRjaCB1cCB3aXRoIHRoZSBidWlsdC1pbgpjb250cmFjdHMgZXJyb3IgcmVwb3J0aW5nLiBQb29sIGZhY3Rvcnkgc3BlY2lmaWMgZXJyb3JzIHN0YXJ0IGF0IDEzMDAuAAAAAAAAAAAAABRUcmVhc3VyeUZhY3RvcnlFcnJvcgAAAAMAAAAAAAAADUludGVybmFsRXJyb3IAAAAAAAABAAAAAAAAABdBbHJlYWR5SW5pdGlhbGl6ZWRFcnJvcgAAAAADAAAAAAAAABdJbnZhbGlkVHJlYXN1cnlJbml0QXJncwAAAAUU" ]),
      options
    )
  }
  public readonly fromJSON = {
    initialize: this.txFromJSON<null>,
        deploy: this.txFromJSON<string>,
        set_admin: this.txFromJSON<null>,
        is_treasury: this.txFromJSON<boolean>
  }
}