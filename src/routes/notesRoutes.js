import { Router } from 'express';

import {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from '../controllers/notesController.js';

import {
  getAllNotesSchema,
  noteIdSchema,
  createNoteSchema,
  updateNoteSchema,
} from '../validations/notesSchemas.js';

const router = Router();

// GET /notes
router.get('/notes', getAllNotesSchema, getAllNotes);

// GET /notes/:id
router.get('/notes/:id', noteIdSchema, getNoteById);

// POST /notes
router.post('/notes', createNoteSchema, createNote);

// PATCH /notes/:id
router.patch('/notes/:id', updateNoteSchema, updateNote);

// DELETE /notes/:id
router.delete('/notes/:id', noteIdSchema, deleteNote);

export default router;



