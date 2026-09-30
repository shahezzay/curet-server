import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    price: {
        type: Number,
    },
    imageUrl: {
        type: String,
    },
    desc: {
        type: String,
    },
});

const product = mongoose.model("Product", productSchema);

export default product; 