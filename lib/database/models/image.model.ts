import { Document, model, models, Schema } from "mongoose";

const ImageSchema = new Schema({
  title: { type: String, required: true },
  transformationType: { type: String, required: true },
  publicId: { type: String, required: true },
  secureUrl: { type: String, required: true },
  width: Number,
  height: Number,
  config: Object,
  transformationUrl: String,
  aspectRatio: String,
  color: String,
  prompt: String,
  author: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});
//timestamp produces below both pro
// createdAt: { type: Date, default: Date.now },
// updatedAt: { type: Date, default: Date.now },

const Image = models?.Image || model("Image", ImageSchema);

export default Image;

export interface IImage extends Document {
  title: string;
  transformationType: string;
  publicId: string;
  secureUrl: string;
  width?: number;
  height?: number;
  config?: object;
  transformationUrl?: string;
  aspectRatio?: string;
  color?: string;
  prompt?: string;
  author?: {
    _id: string;
    firstName: string;
    lasetName: string;
  };
  updatedAt?: Date;
  createdAt?: Date;
}
