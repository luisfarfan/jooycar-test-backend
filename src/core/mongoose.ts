import { injectable } from 'inversify';
import mongoose from 'mongoose';

@injectable()
export class MongooseClient {
  protected mongooseUri = 'mongodb://localhost:27017/jooycar-db';

  async connect() {
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
