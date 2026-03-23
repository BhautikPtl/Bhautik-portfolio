import express from 'express';
import multer from 'multer';
import path from 'path';
import { getProfile, updateProfile } from '../controllers/profile.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.get('/', getProfile);
router.put('/', verifyToken, upload.single('profilePicture'), updateProfile);

export default router;
