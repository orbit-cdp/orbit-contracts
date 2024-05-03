import { ContractSpec } from '@stellar/stellar-sdk';
import { Buffer } from "buffer";
import { ContractClient, } from '@stellar/stellar-sdk/lib/contract_client/index.js';
export * from '@stellar/stellar-sdk';
export * from '@stellar/stellar-sdk/lib/contract_client/index.js';
export * from '@stellar/stellar-sdk/lib/rust_types/index.js';
if (typeof window !== 'undefined') {
    //@ts-ignore Buffer exists
    window.Buffer = window.Buffer || Buffer;
}
export const networks = {
    standalone: {
        networkPassphrase: "Standalone Network ; February 2017",
        contractId: "CB52HS33TBPKPAXW6Z52DZKUGV4GVCPA4UPWFLPHUQWFPL47IONV6UG4",
    }
};
/**
 * Error codes for the pool factory contract. Common errors are codes that match up with the built-in
 * contracts error reporting. Pool factory specific errors start at 1300.
 */
export const Errors = {
    1: { message: "" },
    3: { message: "" },
    1300: { message: "" }
};
export class Client extends ContractClient {
    options;
    constructor(options) {
        super(new ContractSpec(["AAAAAgAAAAAAAAAAAAAAFlRyZWFzdXJ5RmFjdG9yeURhdGFLZXkAAAAAAAEAAAABAAAAAAAAAAlDb250cmFjdHMAAAAAAAABAAAAEw==",
            "AAAAAQAAAAAAAAAAAAAAEFRyZWFzdXJ5SW5pdE1ldGEAAAACAAAAAAAAAAxwb29sX2ZhY3RvcnkAAAATAAAAAAAAAA10cmVhc3VyeV9oYXNoAAAAAAAD7gAAACA=",
            "AAAAAAAAAAAAAAAKaW5pdGlhbGl6ZQAAAAAAAgAAAAAAAAAFYWRtaW4AAAAAAAATAAAAAAAAABJ0cmVhc3VyeV9pbml0X21ldGEAAAAAB9AAAAAQVHJlYXN1cnlJbml0TWV0YQAAAAA=",
            "AAAAAAAAAAAAAAAGZGVwbG95AAAAAAADAAAAAAAAAARzYWx0AAAD7gAAACAAAAAAAAAADXRva2VuX2FkZHJlc3MAAAAAAAATAAAAAAAAAApibGVuZF9wb29sAAAAAAATAAAAAQAAABM=",
            "AAAAAAAAAAAAAAAJc2V0X2FkbWluAAAAAAAAAQAAAAAAAAAJbmV3X2FkbWluAAAAAAAAEwAAAAA=",
            "AAAAAAAAAAAAAAALaXNfdHJlYXN1cnkAAAAAAQAAAAAAAAALdHJlYXN1cnlfaWQAAAAAEwAAAAEAAAAB",
            "AAAABAAAAKlFcnJvciBjb2RlcyBmb3IgdGhlIHBvb2wgZmFjdG9yeSBjb250cmFjdC4gQ29tbW9uIGVycm9ycyBhcmUgY29kZXMgdGhhdCBtYXRjaCB1cCB3aXRoIHRoZSBidWlsdC1pbgpjb250cmFjdHMgZXJyb3IgcmVwb3J0aW5nLiBQb29sIGZhY3Rvcnkgc3BlY2lmaWMgZXJyb3JzIHN0YXJ0IGF0IDEzMDAuAAAAAAAAAAAAABRUcmVhc3VyeUZhY3RvcnlFcnJvcgAAAAMAAAAAAAAADUludGVybmFsRXJyb3IAAAAAAAABAAAAAAAAABdBbHJlYWR5SW5pdGlhbGl6ZWRFcnJvcgAAAAADAAAAAAAAABdJbnZhbGlkVHJlYXN1cnlJbml0QXJncwAAAAUU"]), options);
        this.options = options;
    }
    fromJSON = {
        initialize: (this.txFromJSON),
        deploy: (this.txFromJSON),
        set_admin: (this.txFromJSON),
        is_treasury: (this.txFromJSON)
    };
}
