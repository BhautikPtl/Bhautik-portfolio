import express from 'express';
import { getAllMessages, createMessage, deleteMessage } from '../controllers/messageController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authMiddleware, getAllMessages);
router.post('/', createMessage);
router.delete('/:id', authMiddleware, deleteMessage);

export default router;
