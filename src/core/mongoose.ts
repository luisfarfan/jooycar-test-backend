import { injectable } from 'inversify';
import mongoose from 'mongoose';
import * as process from 'process';

@injectable()
export class MongooseClient {
  protected mongooseUri = process.env.MONGODB_URI;

  async connect() {
    console.log(this.mongooseUri);
    try {
      await mongoose.connect(this.mongooseUri);
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Failed to connect to MongoDB', error);
    }
  }

  public getInstance() {
    return mongoose;
  }
}
