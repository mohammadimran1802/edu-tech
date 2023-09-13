"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProgressModel = exports.userProgressSchema = void 0;
const mongoose_1 = require("mongoose");
exports.userProgressSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    chapterId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    topicId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    completedSections: { type: [String] },
    score: { type: Number }, // Overall score for the topic
});
exports.UserProgressModel = mongoose_1.models.UserProgress || (0, mongoose_1.model)('UserProgress', exports.userProgressSchema, 'userProgress');
