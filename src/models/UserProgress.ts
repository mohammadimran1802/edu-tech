import {model, Schema,InferSchemaType, models} from "mongoose";

export const userProgressSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  chapterId: { type:Schema.Types.ObjectId, required: true },
  topicId: { type: Schema.Types.ObjectId, required: true },
  completedSections: {type:[String]}, // Array of section names (e.g., 'text', 'video', 'image', 'quiz')
  score: {type: Number}, // Overall score for the topic
});

export type IUserProgressSchema = InferSchemaType<typeof userProgressSchema>;

export const UserProgressModel = models.UserProgress || model('UserProgress', userProgressSchema, 'userProgress');
