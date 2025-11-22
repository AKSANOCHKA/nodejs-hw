import { Note } from '../models/note.js';
import createHttpError from 'http-errors';

// GET /notes
export const getAllNotes = async (req, res) => {
  const { page = 1, perPage = 10, tag, search } = req.query;

  const pageNum = Number(page);
  const perPageNum = Number(perPage);

  const skip = (pageNum - 1) * perPageNum;

  const notesQuery = Note.find();

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

// GET /notes/:id
export const getNoteById = async (req, res, next) => {
  const { id } = req.params;

  const note = await Note.findById(id);
  if (!note) {
    return next(createHttpError(404, 'Note not found'));
  }

  res.status(200).json(note);
};

// POST /notes
export const createNote = async (req, res) => {
  const note = await Note.create(req.body);
  res.status(201).json(note);
};

// DELETE /notes/:id
export const deleteNote = async (req, res, next) => {
  const { id } = req.params;

  const note = await Note.findByIdAndDelete(id);
  if (!note) {
    return next(createHttpError(404, 'Note not found'));
  }

  res.status(200).json(note);
};

// PATCH /notes/:id
export const updateNote = async (req, res, next) => {
  const { id } = req.params;

  const note = await Note.findByIdAndUpdate(id, req.body, { new: true });
  if (!note) {
    return next(createHttpError(404, 'Note not found'));
  }

  res.status(200).json(note);
};

