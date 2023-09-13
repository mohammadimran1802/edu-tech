"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChapterModel = exports.chapterSchema = exports.Status = void 0;
const mongoose_1 = require("mongoose");
const cloneSchema_1 = __importDefault(require("../utils/cloneSchema"));
const Topic_1 = require("./Topic");
var Status;
(function (Status) {
    Status["Locked"] = "LOCKED";
    Status["Unlocked"] = "UNLOCKED";
    Status["Completed"] = "COMPLETED";
})(Status || (exports.Status = Status = {}));
exports.chapterSchema = new mongoose_1.Schema({
    grade: { type: Number, required: true },
    chapterNumber: { type: Number, required: true },
    chapterTitle: { type: String, required: true },
    status: {
        type: String,
        enum: Object.values(Status),
        default: "LOCKED",
    },
    topics: [(0, cloneSchema_1.default)(Topic_1.topicSchema, ['title', 'content'])]
});
exports.ChapterModel = mongoose_1.models.Chapter || (0, mongoose_1.model)('Chapter', exports.chapterSchema, 'chapter');
