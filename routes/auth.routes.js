import { Router } from 'express';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import config from 'config';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const authRouter = Router();

authRouter.post(
  '/register',
  [
    check('email', 'Uncorrect email').isEmail(),
    check('password', 'Min length password 6').isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errorsValidations = validationResult(req);
      if (!errorsValidations.isEmpty()) {
        return res.status(400).json({
          errors: errorsValidations.array(),
          message: 'Uncorrect registration data',
        });
      }
      const { email, password } = req.body;
      const candidate = await User.findOne({ email });
      if (candidate) {
        return res.status(400).json({ message: 'Such user already exists' });
      }
      const hashedPassword = await bcrypt.hash(password, 2);
      const user = new User({ email, password: hashedPassword });
      await user.save();
      res.status(201).json({ message: 'User was created' });
    } catch (err) {
      res.status(500).json({ message: 'Somethig went wrong, try again' });
    }
  },
);

authRouter.post(
  '/login',
  [
    check('email', 'Write correct email').normalizeEmail().isEmail(),
    check('password', 'Empty password').exists(),
  ],
  async (req, res) => {
    try {
      const errorsValidations = validationResult(req);
      if (!errorsValidations.isEmpty()) {
        return res.status(400).json({
          errors: errorsValidations.array(),
          message: 'Uncorrect login data',
        });
      }

      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Such user not exists' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(400).json({ message: 'wrong password' });
      }

      const token = jwt.sign(
        { userId: user.id },
        config.get('jwtSecret'),
        { expiresIn: '1h' },
      );

      return res.json({ token, userId: user.id });
    } catch (err) {
      res.status(500).json({ message: 'Somethig went wrong, try again' });
    }
  },
);

export default authRouter;
