import mongoose, { Mongoose } from 'mongoose';
import baseMapper from '../common/BaseMapper';

class MongoConnector extends baseMapper{
  public mongoose: Mongoose;

  constructor() {
    super();
    this.mongoose = mongoose;
  }

  async connect() {
    await this.mongoose.connect(this.databaseURL);
  }
}

export default MongoConnector;