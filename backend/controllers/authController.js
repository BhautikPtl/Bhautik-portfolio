import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Login attempt:', { username, passwordLength: password?.length });
    
    const admin = await Admin.findOne({ username });
    console.log('Admin found:', !!admin);
    
    if (!admin || !(await admin.comparePassword(password))) {
      if (admin) console.log('Password comparison failed');
      else console.log('Admin not found in database');
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, admin: { username: admin.username } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
