"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.default = (0, apollo_server_1.gql) `
  type Progress {
    grade: Int!
    chapter: Int!
    topic: String!
    section: String!
    score: Float
  }

  type Chapter {
    id: ID!
    grade: Int!
    chapterNumber: Int!
    chapterTitle: String!
    status: ChapterStatus!
  }

  enum ChapterStatus {
    LOCKED
    UNLOCKED
    COMPLETED
  }

  type Topic {
    id: ID!
    chapterId: ID!
    title: String!
    content: TopicContent!
    questions: [Question!]!
  }

  type TopicContent {
    text: String!
    videoUrl: String!
    imageUrl: String!
  }

  type Question {
    id: ID!
    questionText: String!
    options: [String!]!
    correctAnswer: String!
  }

  type Query {
    getChapter(id: ID!): Chapter
    getTopic(id: ID!): Topic
  }

  type Mutation {
    updateUserProgress(
      userId: ID!
      chapterId: ID!
      topicId: ID!
      section: String!
      score: Float
    ): User
  }
`;
