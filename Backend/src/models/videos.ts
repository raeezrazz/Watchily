import mongoose, { Schema, Document } from "mongoose";

export interface IVideo extends Document {
  title: string;
  youtube_url: string;
  createdAt: Date;
}

const VideoSchema = new Schema<IVideo>(
  {
    title: { type: String, required: true },
    youtube_url: { type: String, required: true },
  },
  { timestamps: true }
);

export const Video = mongoose.model<IVideo>("Video", VideoSchema);
