import Message from '../models/Message.js';

export const sendMessage = async (req, res) => {
  try {
    const message = await Message.create(req.body);
    res.status(201).json({ message: 'Message sent successfully!', data: message });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    console.log('Deleting message with ID:', req.params.id);
    const result = await Message.findByIdAndDelete(req.params.id);
    console.log('Delete result:', result);
    res.json({ message: 'Message deleted' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ message: err.message });
  }
};
