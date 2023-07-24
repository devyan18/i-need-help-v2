import { model, Schema } from 'mongoose';

const PostSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  slug: {
    type: String,
    unique: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

PostSchema.pre('save', function (next) {
  const post = this;
  const slug = post.title.toLowerCase().split(' ').join('-');
  post.slug = slug;
  next();
});

export const PostModel = model('Post', PostSchema);
