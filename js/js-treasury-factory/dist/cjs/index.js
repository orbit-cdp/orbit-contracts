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
        contractId: "CB52HS33TBPKPAXW6Z52DZKUGV4GVCPA4UPWFLPHUQWFPL47IONV6UG4",
    }
};
/**
 * Error codes for the pool factory contract. Common errors are codes that match up with the built-in
 * contracts error reporting. Pool factory specific errors start at 1300.
 */
exports.Errors = {
    1: { message: "" },
    3: { message: "" },
    1300: { message: "" }
};
class Client extends index_js_1.ContractClient {
    options;
    constructor(options) {
        super(new stellar_sdk_1.ContractSpec(["AAAAAgAAAAAAAAAAAAAAFlRyZWFzdXJ5RmFjdG9yeURhdGFLZXkAAAAAAAEAAAABAAAAAAAAAAlDb250cmFjdHMAAAAAAAABAAAAEw==",
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
exports.Client = Client;
