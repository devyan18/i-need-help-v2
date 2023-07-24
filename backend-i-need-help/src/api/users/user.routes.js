import { Router } from 'express';
import { loginUser, registerUser } from './user.services.js';

const router = Router();

router.put('/', async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    console.log(req.body);
    const user = await loginUser(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export { router as userRouter };
