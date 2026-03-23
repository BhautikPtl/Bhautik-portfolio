import express from 'express';
import multer from 'multer';
import {
  getAllCertificates,
  createCertificate,
  updateCertificate,
  deleteCertificate,
} from '../controllers/certificateController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', getAllCertificates);
router.post('/', authMiddleware, upload.single('image'), createCertificate);
router.put('/:id', authMiddleware, upload.single('image'), updateCertificate);
router.delete('/:id', authMiddleware, deleteCertificate);

export default router;
