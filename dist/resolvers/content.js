"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const graphql_1 = require("graphql");
const Chapter_1 = require("../models/Chapter");
const Topic_1 = require("../models/Topic");
exports.default = {
    Mutation: {
        createChapter: async (_, { chapterInput: { chapterNumber, chapterTitle, grade, status } }) => {
            const chapter = await Chapter_1.ChapterModel.findOne({ chapterNumber });
            if (chapter)
                throw new graphql_1.GraphQLError(`This chapter exists in the system.`, {
                    extensions: { code: 409, message: "chapter  exist" },
                });
            const new_chapter = new Chapter_1.ChapterModel({
                chapterNumber,
                chapterTitle,
                grade,
                status,
            });
            await new_chapter.save();
            return {
                // Success
                code: 200,
                chapter: new_chapter,
                success: true,
                message: "New chapter is add in system",
            };
        },
        createTopic: async (_, { chapter_id, topicInputDetails }) => {
            let chapter = await Chapter_1.ChapterModel.findOne({ _id: chapter_id }).exec();

            if (!chapter)
                throw new graphql_1.GraphQLError(`This chapter is doesn't exists in the system.`, {
                    extensions: {
                        code: 409,
                        message: "This chapter is doesn't exists in the system",
                    },
                });
            const new_topic = new Topic_1.TopicModel({
                chapterId: chapter_id,
                title: topicInputDetails.title,
                content: {
                    text: topicInputDetails.content.text,
                    videoUrl: topicInputDetails.content.videoUrl,
                    imageUrl: topicInputDetails.content.text,
                },
                questions: [
                    {
                        questionText: topicInputDetails.questions[0].questionText,
                        options: topicInputDetails.questions[0].options,
                        correctAnswer: topicInputDetails.questions[0].correctAnswer,
                    },
                ],
            });
            // Save the topic in database
            if (!chapter.topics)
                chapter.topics = [];
            chapter.topics.push(new_topic);
            await chapter.save();
            return {
                code: 200,
                success: true,
                message: `new topic created in ${chapter.chapterTitle}`,
                topic: await new_topic.save(),
            };
        },
    },
    Query: {
        getChapters: async () => {
            let chapters = await Chapter_1.ChapterModel.find().exec();
            if (!chapters)
                throw new graphql_1.GraphQLError(`No records. Please check again.`, {
                    extensions: { code: "INVALID_INPUT" },
                });
            return chapters;
        },
        getTopic: async (_, { topic_id }) => {
            let topic = await Topic_1.TopicModel.findOne({ _id: topic_id }).exec();
            if (!topic)
                throw new graphql_1.GraphQLError(`No records. Please check again.`, {
                    extensions: { code: "INVALID_INPUT" },
                });
            return topic;
        },
    },
    Chapter: {
        topic: async (parent) => {
            return await Topic_1.TopicModel.find({ chapterId: parent._id }).exec();
        },
    },
};
