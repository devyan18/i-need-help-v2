import express from 'express';
import http from 'node:http';
import { Server } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { postRouter } from './api/posts/post.routes.js';
import { userRouter } from './api/users/user.routes.js';

import { getPostById, toggLikePost } from './api/posts/post.services.js';
import { connectToMongoDb } from './config/connection.js';
import { env } from './config/config.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use('/api/posts', postRouter);
app.use('/api/users', userRouter);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  socket.on('like-post', async ({ userId, postId }) => {
    console.log('like-post', userId, postId);

    await toggLikePost({ userId, postId });

    const post = await getPostById(postId);

    io.emit('like-post', { post });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
  });
});

server.listen(env.PORT, async () => {
  console.log(`listening on *:${env.PORT}`);
  await connectToMongoDb({ uri: env.MORNGODB_URI });
});
