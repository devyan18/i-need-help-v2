import { UserModel } from './user.entity.js';
import { PostModel } from '../posts/post.entity.js';

export async function registerUser ({ username, password }) {
  if (!username) throw new Error('Username is required');
  if (!password) throw new Error('Password is required');

  const newUser = new UserModel({ username, password });

  try {
    const user = await newUser.save();
    return user;
  } catch (_error) {
    throw new Error("Couldn't create user");
  }
}

export async function loginUser ({ username, password }) {
  if (!username) throw new Error('Username is required');
  if (!password) throw new Error('Password is required');

  const user = await UserModel.findOne({ username });

  if (!user) throw new Error('User not found');

  const validPassword = user.comparePasswords(password);

  if (!validPassword) throw new Error('Invalid password');

  return user;
}

export async function addPostToUser ({ userId, postId }) {
  if (!userId) throw new Error('User id is required');
  if (!postId) throw new Error('Post id is required');

  const post = await PostModel.findById(postId);
  if (!post) throw new Error('Post not found');

  const user = await UserModel.findById(userId);
  if (!user) throw new Error('User not found');

  user.posts.push(postId);

  try {
    await user.save();
    return user;
  } catch (_error) {
    throw new Error("Couldn't add post to user");
  }
}
