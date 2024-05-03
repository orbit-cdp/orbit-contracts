"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = exports.Errors = exports.networks = void 0;
const stellar_sdk_1 = require("@stellar/stellar-sdk");
const buffer_1 = require("buffer");
const index_js_1 = require("@stellar/stellar-sdk/lib/contract_client/index.js");
__exportStar(require("@stellar/stellar-sdk"), exports);
__exportStar(require("@stellar/stellar-sdk/lib/contract_client/index.js"), exports);
__exportStar(require("@stellar/stellar-sdk/lib/rust_types/index.js"), exports);
if (typeof window !== 'undefined') {
    //@ts-ignore Buffer exists
    window.Buffer = window.Buffer || buffer_1.Buffer;
}
exports.networks = {
    standalone: {
        networkPassphrase: "Standalone Network ; February 2017",
        contractId: "CBHNYJQ3GDJCNYKTPN3DTPYKZF4ZMMSEQY2IJFE4O5IMJ6GXYLN5HC3T",
    }
};
/**
 * Error codes for the pool factory contract. Common errors are codes that match up with the built-in
 * contracts error reporting. Treasury specific errors start at 2000.
 */
exports.Errors = {
    1: { message: "" },
    3: { message: "" },
    4: { message: "" },
    8: { message: "" },
    10: { message: "" },
    12: { message: "" },
    2000: { message: "" }
};
class Client extends index_js_1.ContractClient {
    options;
    constructor(options) {
        super(new stellar_sdk_1.ContractSpec(["AAAAAAAAAAAAAAAKaW5pdGlhbGl6ZQAAAAAAAwAAAAAAAAAFYWRtaW4AAAAAAAATAAAAAAAAAAV0b2tlbgAAAAAAABMAAAAAAAAACmJsZW5kX3Bvb2wAAAAAABMAAAAA",
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
exports.Client = Client;
