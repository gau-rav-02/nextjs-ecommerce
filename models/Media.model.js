import mongoose from "mongoose";

const MediaSchema = new mongoose.Schema(
  {
    asset_id: {
      type: String,
      required: true,
      trim: true,
    },
    public_id: {
      type: String,
      required: true,
      trim: true,
    },
    path: {
      type: String,
      required: true,
      trim: true,
    },
    thumbnail_url: {
      type: String,
      required: true,
      trim: true,
    },
    secure_url: {
      type: String,
      required: true,
      trim: true,
    },
    alt: {
      type: String,
      trim: true,
    },
    title: {
      type: String,
      trim: true,
    },
    deleted_at: {
      type: Date,
      default: null,
      index: true,
    },
  },
  { timestamps: true }
);

const MediaModel = mongoose.models.Media || mongoose.model("Media", MediaSchema, 'medias');

export default MediaModel;
