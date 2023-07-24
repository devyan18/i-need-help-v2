import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'Username is required']
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }]
}, {
  timestamps: true
});

UserSchema.pre('save', function (next) {
  const user = this;
  const hash = bcrypt.hashSync(user.password, 10);
  this.password = hash;
  next();
});

UserSchema.methods.comparePasswords = function (password) {
  return bcrypt.compareSync(password, this.password);
};

export const UserModel = model('User', UserSchema);
