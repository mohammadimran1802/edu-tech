import {model, Schema,InferSchemaType,models} from "mongoose";

export const topicSchema = new Schema({
  chapterId: { type: Schema.Types.ObjectId, required: true ,ref:'Chapter'},
  title: { type: String, required: true },
  content: {
    text: {type:String},
    videoUrl: {type:String},
    imageUrl: {type:String},
  },
  questions: [
    {
      questionText: {type:String},
      options: {type:[String]},
      correctAnswer: {type:String},
    },
  ],
});



export type ITopic = InferSchemaType<typeof topicSchema>;

export const TopicModel = models.Topic || model('Topic', topicSchema, 'topic');
