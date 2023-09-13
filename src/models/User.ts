import exp from "constants";
import { model, Schema, InferSchemaType, models } from "mongoose";

export enum Role {
  Admin = "ADMIN",
  Teacher = "TEACHER",
  Student = "STUDENT",
}

export const userSchema = new Schema({
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

export type IUser = InferSchemaType<typeof userSchema>;

export const UserModel = models.User || model("User", userSchema, "user");
