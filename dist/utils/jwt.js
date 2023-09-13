"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = exports.createToken = void 0;
const jwt = require("jsonwebtoken");
const createToken = (auth) => {
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
        data: auth,
    }, process.env.SECRET_KEY);
};
exports.createToken = createToken;
const decodeToken = (authToken) => {
    let { data } = jwt.verify(authToken, process.env.SECRET_KEY);
    let { id, username, role, mobile, email } = data;
    return {
        id,
        username,
        role,
        mobile,
        email
    };
};
exports.decodeToken = decodeToken;
