import { PostModel } from './post.entity.js';
import { addPostToUser } from '../users/user.services.js';

export async function createPost ({ title, content, userId }) {
  if (!title) throw new Error('Title is required');
  if (!content) throw new Error('Content is required');
  if (!userId) throw new Error('User id is required');

  const newPost = new PostModel({ title, content, creator: userId });

  let post;
  try {
    post = await newPost.save();
  } catch (_error) {
    throw new Error("Couldn't create post");
  }

  try {
    await addPostToUser({ userId, postId: post._id });
    return post;
  } catch (_error) {
    throw new Error("Couldn't add post to user");
  }
}

export async function getPosts () {
  const posts = await (await PostModel.find().populate('creator')).orderBy('createdAt', 'desc');
  return posts;
}

export async function getPostById (id) {
  if (!id) throw new Error('Post id is required');

  const post = await PostModel.findById(id).populate('creator');
  if (!post) throw new Error('Post not found');

  return post;
}

export async function getPostsFromCreator ({ userId }) {
  if (!userId) throw new Error('User id is required');

  const posts = await PostModel.find({ creator: userId });
  return posts;
}

export async function toggLikePost ({ postId, userId }) {
  if (!postId) throw new Error('Post id is required');
  if (!userId) throw new Error('User id is required');

  const post = await PostModel.findById(postId);
  if (!post) throw new Error('Post not found');

  const isLiked = post.likes.includes(userId);

  if (isLiked) {
    post.likes = post.likes.filter(id => id !== userId);
  } else {
    post.likes.push(userId);
  }

  try {
    await post.save();
    return post;
  } catch (_error) {
    throw new Error("Couldn't like post");
  }
}
