"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const SECRET_KEY = process.env.SECRET_KEY;
exports.default = (user) => {
    return jsonwebtoken_1.default.sign({
        id: user._id,
        username: user.username
    }, SECRET_KEY, { expiresIn: '7d' });
};
