import Certificate from '../models/Certificate.js';
import imagekit from '../config/imagekit.js';

export const getCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ date: -1 });
    res.json(certificates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createCertificate = async (req, res) => {
  try {
    const certificateData = { ...req.body };
    
    if (req.file) {
      try {
        const uploadResponse = await imagekit.upload({
          file: req.file.buffer,
          fileName: `${Date.now()}-${req.file.originalname}`,
          folder: "/certificates"
        });
        certificateData.image = uploadResponse.url;
      } catch (uploadErr) {
        throw new Error(`ImageKit Upload Failed: ${uploadErr.message}`);
      }
    }

    const certificate = await Certificate.create(certificateData);
    res.status(201).json(certificate);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteCertificate = async (req, res) => {
  try {
    await Certificate.findByIdAndDelete(req.params.id);
    res.json({ message: 'Certificate deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
