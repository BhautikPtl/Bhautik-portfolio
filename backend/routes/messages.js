import express from 'express';
import { sendMessage, getMessages, deleteMessage } from '../controllers/messageController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/', sendMessage);
router.get('/', auth, getMessages);
router.delete('/:id', auth, deleteMessage);

export default router;
