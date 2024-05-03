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
        contractId: "CBHNYJQ3GDJCNYKTPN3DTPYKZF4ZMMSEQY2IJFE4O5IMJ6GXYLN5HC3T",
    }
};
/**
 * Error codes for the pool factory contract. Common errors are codes that match up with the built-in
 * contracts error reporting. Treasury specific errors start at 2000.
 */
export const Errors = {
    1: { message: "" },
    3: { message: "" },
    4: { message: "" },
    8: { message: "" },
    10: { message: "" },
    12: { message: "" },
    2000: { message: "" }
};
export class Client extends ContractClient {
    options;
    constructor(options) {
        super(new ContractSpec(["AAAAAAAAAAAAAAAKaW5pdGlhbGl6ZQAAAAAAAwAAAAAAAAAFYWRtaW4AAAAAAAATAAAAAAAAAAV0b2tlbgAAAAAAABMAAAAAAAAACmJsZW5kX3Bvb2wAAAAAABMAAAAA",
            "AAAAAAAAAAAAAAAJc2V0X2FkbWluAAAAAAAAAQAAAAAAAAAJbmV3X2FkbWluAAAAAAAAEwAAAAA=",
            "AAAAAAAAAAAAAAAPaW5jcmVhc2Vfc3VwcGx5AAAAAAEAAAAAAAAABmFtb3VudAAAAAAACwAAAAA=",
            "AAAAAAAAAAAAAAAPZGVjcmVhc2Vfc3VwcGx5AAAAAAEAAAAAAAAABmFtb3VudAAAAAAACwAAAAA=",
            "AAAAAAAAAAAAAAARZ2V0X3Rva2VuX2FkZHJlc3MAAAAAAAAAAAAAAQAAABM=",
            "AAAAAAAAAAAAAAARZ2V0X2JsZW5kX2FkZHJlc3MAAAAAAAAAAAAAAQAAABM=",
            "AAAABAAAAKVFcnJvciBjb2RlcyBmb3IgdGhlIHBvb2wgZmFjdG9yeSBjb250cmFjdC4gQ29tbW9uIGVycm9ycyBhcmUgY29kZXMgdGhhdCBtYXRjaCB1cCB3aXRoIHRoZSBidWlsdC1pbgpjb250cmFjdHMgZXJyb3IgcmVwb3J0aW5nLiBUcmVhc3VyeSBzcGVjaWZpYyBlcnJvcnMgc3RhcnQgYXQgMjAwMC4AAAAAAAAAAAAADVRyZWFzdXJ5RXJyb3IAAAAAAAAHAAAAAAAAAA1JbnRlcm5hbEVycm9yAAAAAAAAAQAAAAAAAAAXQWxyZWFkeUluaXRpYWxpemVkRXJyb3IAAAAAAwAAAAAAAAARVW5hdXRob3JpemVkRXJyb3IAAAAAAAAEAAAAAAAAABNOZWdhdGl2ZUFtb3VudEVycm9yAAAAAAgAAAAAAAAADEJhbGFuY2VFcnJvcgAAAAoAAAAAAAAADU92ZXJmbG93RXJyb3IAAAAAAAAMAAAAAAAAAAtTdXBwbHlFcnJvcgAAAAfQ"]), options);
        this.options = options;
    }
    fromJSON = {
        initialize: (this.txFromJSON),
        set_admin: (this.txFromJSON),
        increase_supply: (this.txFromJSON),
        decrease_supply: (this.txFromJSON),
        get_token_address: (this.txFromJSON),
        get_blend_address: (this.txFromJSON)
    };
}
