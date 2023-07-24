import { Router } from 'express';
import {
  createPost,
  getPostById,
  getPosts,
  getPostsFromCreator
} from './post.services.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const posts = await getPosts();
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/creator', async (req, res) => {
  try {
    const posts = await getPostsFromCreator({ userId: req.body.userId });
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const post = await getPostById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/', async (req, res) => {
  try {
    const post = await createPost(req.body);
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export { router as postRouter };
