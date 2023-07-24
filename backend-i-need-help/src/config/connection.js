import { connect } from 'mongoose';

export async function connectToMongoDb ({ uri }) {
  try {
    const conn = await connect(uri);
    console.log(`Connected to ${conn.connection.db.databaseName}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
