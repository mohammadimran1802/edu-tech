import {model, Schema,InferSchemaType, models} from "mongoose";
import cloneSchema from "../utils/cloneSchema";
import { ITopic,topicSchema as schema } from "./Topic";


export enum Status {
  Locked = "LOCKED",
  Unlocked = "UNLOCKED",
  Completed = "COMPLETED",
}

export const chapterSchema = new Schema({
  grade: { type: Number, required: true },
  chapterNumber: { type: Number, required: true },
  chapterTitle: { type: String, required: true },
  status: {
    type: String,
    enum: Object.values(Status),
    default: "LOCKED",
  },
  topics: [cloneSchema<ITopic>(schema, ['title','content'])]
});

export type IChapter = InferSchemaType<typeof chapterSchema>;

export const ChapterModel = models.Chapter || model('Chapter', chapterSchema, 'chapter');
