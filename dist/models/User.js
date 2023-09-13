"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.userSchema = exports.Role = void 0;
const mongoose_1 = require("mongoose");
var Role;
(function (Role) {
    Role["Admin"] = "ADMIN";
    Role["Teacher"] = "TEACHER";
    Role["Student"] = "STUDENT";
})(Role || (exports.Role = Role = {}));
exports.userSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: {
        type: String,
        require: true,
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: {
        type: String,
        enum: Object.values(Role),
        requird: true,
    },
    progress: {
        grade: { type: Number, default: 5 },
        chapter: { type: Number, default: 1 },
        topic: { type: String, default: "Chapter 1 - Topic Name" },
        section: { type: String, default: "text" },
        score: { type: Number, default: null },
    },
});
exports.UserModel = mongoose_1.models.User || (0, mongoose_1.model)("User", exports.userSchema, "user");
