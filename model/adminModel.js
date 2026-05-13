import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true
    },

    requiredSkills: {
        type: [String],
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model("admins", adminSchema);