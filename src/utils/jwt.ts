const jwt = require("jsonwebtoken");
import { ObjectId } from "mongoose";
import { IUser } from "../models/User";

export type Auth = {
    id?: ObjectId;
    username?: string;
    role?: IUser["role"];
    mobile?: string | null;
    email?: string | null;
};

export const createToken = (auth: Auth): string => {
    return jwt.sign(
        {
            exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, //24 hour expirty,
            data: auth,
        },
        process.env.SECRET_KEY as string
    );
};

export const decodeToken = (authToken: string): Auth => {
    let { data } = jwt.verify(authToken, process.env.SECRET_KEY as string);
    let { id, username, role, mobile, email } = data;
    return {
        id,
        username,
        role,
        mobile,
        email
    };
};