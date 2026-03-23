import multer from 'multer';
import path from 'path';

const storage = multer.memoryStorage();

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp|avif|pdf/i;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error(`Only images and PDFs are allowed (jpeg, jpg, png, webp, avif, pdf). Received: ${file.mimetype}`));
    }
  }
});

export default upload;
