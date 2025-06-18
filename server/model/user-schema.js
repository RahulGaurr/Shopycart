import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
            trim: true,
            minlength: 5,
            maxlength: 20,
        },
        lastname: {
            type: String,
            required: true,
            trim: true,
            minlength: 5,
            maxlength: 20,
        },
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            index: true,
            lowercase: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
            match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please enter a valid email address"],
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
            match: [/^\d{10}$/, "Phone number must be 10 digits"],
        },
    },
    { timestamps: true } // Adds createdAt and updatedAt fields
);

const user = mongoose.model("user", userSchema);

export default user;