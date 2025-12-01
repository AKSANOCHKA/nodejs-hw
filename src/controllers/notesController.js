import { Note } from '../models/note.js';
import createHttpError from 'http-errors';

// GET /notes
export const getAllNotes = async (req, res) => {
  const userId = req.user._id;
  const { page = 1, perPage = 10, tag, search } = req.query;

  const pageNum = Number(page);
  const perPageNum = Number(perPage);
  const skip = (pageNum - 1) * perPageNum;

  const notesQuery = Note.find({ userId }); // ❗ Повертаємо лише свої нотатки

  if (tag) {
    notesQuery.where('tag').equals(tag);
  }

  if (search) {
    notesQuery.where({ $text: { $search: search } });
  }

  const [totalNotes, notes] = await Promise.all([
    notesQuery.clone().countDocuments(),
    notesQuery.skip(skip).limit(perPageNum),
  ]);

  res.status(200).json({
    page: pageNum,
    perPage: perPageNum,
    totalNotes,
    totalPages: Math.ceil(totalNotes / perPageNum),
    notes,
  });
};

// GET /notes/:noteId
export const getNoteById = async (req, res, next) => {
  const { noteId } = req.params;
  const userId = req.user._id;

  const note = await Note.findOne({ _id: noteId, userId }); // ❗ Пошук лише серед своїх нотаток
  if (!note) {
    return next(createHttpError(404, 'Note not found'));
  }

  res.status(200).json(note);
};

// POST /notes
export const createNote = async (req, res) => {
  const userId = req.user._id;

  const note = await Note.create({
    ...req.body,
    userId, // ❗ Прив’язка нотатки до користувача
  });

  res.status(201).json(note);
};

// DELETE /notes/:noteId
export const deleteNote = async (req, res, next) => {
  const { noteId } = req.params;
  const userId = req.user._id;

  const note = await Note.findOneAndDelete({ _id: noteId, userId }); // ❗ Delete своїх тільки

  if (!note) {
    return next(createHttpError(404, 'Note not found'));
  }

  res.status(200).json(note);
};

// PATCH /notes/:noteId
export const updateNote = async (req, res, next) => {
  const { noteId } = req.params;
  const userId = req.user._id;

  const note = await Note.findOneAndUpdate(
    { _id: noteId, userId }, // ❗ Update тільки своїх
    req.body,
    { new: true },
  );

  if (!note) {
    return next(createHttpError(404, 'Note not found'));
  }

  res.status(200).json(note);
};


