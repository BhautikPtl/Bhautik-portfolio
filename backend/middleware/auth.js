import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    console.log('Auth middleware - Token exists:', !!token);
    
    if (!token) return res.status(401).json({ message: 'Authentication required' });
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Auth middleware - Decoded ID:', decoded.id);
    req.adminId = decoded.id;
    next();
  } catch (err) {
    console.error('Auth middleware - Error:', err.message);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default auth;
