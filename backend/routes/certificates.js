import express from 'express';
import { getCertificates, createCertificate, deleteCertificate } from '../controllers/certificateController.js';
import auth from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.get('/', getCertificates);
router.post('/', auth, upload.single('image'), createCertificate);
router.delete('/:id', auth, deleteCertificate);

export default router;
