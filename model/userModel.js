import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            "Please enter a valid email address"
        ]
    },

    skills: {
        type: [String],
        required: [true, "Skills are required"],
        validate: {
            validator: v => Array.isArray(v) && v.length > 0,
            message: "At least one skill is required"
        }
    }
}, {
    timestamps: true
});

export default mongoose.model("users", userSchema);