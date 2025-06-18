import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true,
        },
        url: String,
        detailUrl: String,
        title: {
            type: Object, // Consider defining a sub-schema, e.g., { shortTitle: String, longTitle: String }
            required: true,
        },
        price: {
            type: Object, // Consider defining a sub-schema, e.g., { mrp: Number, cost: Number }
            required: true,
        },
        quantity: Number,
        description: String,
        discount: String,
        tagline: String,
    },
    { timestamps: true } // Adds createdAt and updatedAt fields
);

const Product = mongoose.model("product", ProductSchema);

export default Product;