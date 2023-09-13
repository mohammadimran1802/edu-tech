"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const SECRET_KEY = process.env.SECRET_KEY;
exports.default = (context) => {
    // context.req = { ... headers }
    const authHeader = context.req.headers.authorization;
    if (authHeader) {
        // Bearer ....
        const token = authHeader.replace('Bearer', '');
        if (token) {
            try {
                // userPayload
                return jsonwebtoken_1.default.verify(token, SECRET_KEY);
            }
            catch (err) {
                // Invalid/Expired token
                return null;
            }
        }
    }
    return null;
};
