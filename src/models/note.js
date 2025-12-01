import { Schema, model } from 'mongoose';
import { TAGS } from '../constants/tags.js';

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: false,
      trim: true,
      default: '',
    },
    tag: {
      type: String,
      required: false,
      enum: TAGS,
      default: 'Todo',
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',   // посилання на модель User
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Текстовий індекс для пошуку по title та content
noteSchema.index(
  {
    title: 'text',
    content: 'text',
  },
  { name: 'NoteTextIndex' },
);

export const Note = model('Note', noteSchema);

