import 'dotenv/config';

export const env = {
  MORNGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/express-mongo',
  PORT: process.env.PORT || 3000
};
