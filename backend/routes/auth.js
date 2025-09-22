import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import 'dotenv/config';

const router = express.Router();

// In-memory user stub. Replace with a database query.
const users = [
  { id: 1, username: 'admin', password: 'password', role: 'admin' },
  { id: 2, username: 'worker', password: 'password', role: 'worker' },
];

// POST /login - Authenticate user and return JWT
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const payload = { userId: user.id, role: user.role };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

  return res.json({ message: 'Logged in successfully', token: `Bearer ${token}` });
});

// Middleware to protect routes
export const protect = passport.authenticate('jwt', { session: false });

// Middleware to check for admin role
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ message: 'Forbidden: Admins only' });
};

export default router;
