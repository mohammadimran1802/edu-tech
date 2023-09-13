import { gql } from "apollo-server";

export default gql`
  scalar ObjectId

  interface ContentMutationResponse {
    code: Int!
    success: Boolean!
    message: String!
  }

  type Progress {
    grade: Int!
    chapter: Int!
    topic: String!
    section: String!
    score: Float
  }

  type Chapter {
    id: ObjectId!
    grade: Int!
    chapterNumber: Int!
    chapterTitle: String!
    status: ChapterStatus!
    topic: [Topic]
  }

  enum ChapterStatus {
    LOCKED
    UNLOCKED
    COMPLETED
  }

  type Topic {
    id: ObjectId!
    chapterId: ObjectId!
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
    id: ObjectId!
    questionText: String!
    options: [String!]!
    correctAnswer: String!
  }

  type Query {
    getChapters(id: ObjectId):[Chapter]!
    getTopic(topic_id: ObjectId!): Topic
  }

  input ChapterInputDetails {
    grade: Int!
    chapterNumber: Int!
    chapterTitle: String!
    status: ChapterStatus!
  }
  input TopicInputDetails {
    title: String!
    content: inputTopicContent!
    questions: [inputQuestion!]!
  }

  input inputTopicContent {
    text: String!
    videoUrl: String!
    imageUrl: String!
  }

  input inputQuestion {
    questionText: String!
    options: [String!]!
    correctAnswer: String!
  }

  type Mutation {
    createChapter(chapterInput: ChapterInputDetails): ChapterMutationResponse
    updateUserProgress(
      userId: ObjectId!
      chapterId: ObjectId!
      topicId: ObjectId!
      section: String!
      score: Float
    ): User
    createTopic(
      chapter_id: ObjectId
      topicInputDetails: TopicInputDetails
    ): TopicMutationResponse
  }

  type ChapterMutationResponse implements ContentMutationResponse {
    code: Int!
    success: Boolean!
    message: String!
    chapter: Chapter
  }

  type TopicMutationResponse implements ContentMutationResponse {
    code: Int!
    success: Boolean!
    message: String!
    topic: Topic
  }
`;
