import mongoose from "mongoose";

const providerSchema = new mongoose.Schema({
    issuer: String,
    label: String,
    algorithm: String,
    digits: Number,
    period: Number,
    secret: String,
    icon: Object
});

const Provider = mongoose.model('Provider', providerSchema);
export default Provider;