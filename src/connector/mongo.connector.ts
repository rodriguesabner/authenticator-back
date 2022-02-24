import mongoose, {Mongoose} from "mongoose";

class MongoConnector {
    public mongoose: Mongoose;

    constructor() {
        this.mongoose = mongoose;
    }

    async connect() {
        await this.mongoose.connect('mongodb+srv://kingaspx:abner6649@cluster0.kseg8.mongodb.net/keychain?retryWrites=true&w=majority');
    }
}

export default MongoConnector;