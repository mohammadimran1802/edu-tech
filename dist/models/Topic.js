"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopicModel = exports.topicSchema = void 0;
const mongoose_1 = require("mongoose");
exports.topicSchema = new mongoose_1.Schema({
    chapterId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'Chapter' },
    title: { type: String, required: true },
    content: {
        text: { type: String },
        videoUrl: { type: String },
        imageUrl: { type: String },
    },
    questions: [
        {
            questionText: { type: String },
            options: { type: [String] },
            correctAnswer: { type: String },
        },
    ],
});
exports.TopicModel = mongoose_1.models.Topic || (0, mongoose_1.model)('Topic', exports.topicSchema, 'topic');
