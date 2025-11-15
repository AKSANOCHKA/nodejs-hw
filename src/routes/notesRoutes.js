import { Router } from 'express';
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from '../controllers/notesController.js';

const router = Router();

router.get('/', getAllNotes);

router.get('/:noteId', getNoteById);

router.post('/', createNote);

router.patch('/:noteId', updateNote);

router.delete('/:noteId', deleteNote);

export default router;

