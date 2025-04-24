import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
    },
    referralCode: {
        type: String,
        default: null,
    },
    role: {
        type: String,
        enum: ["customer", "admin"],
        default: "customer",
    },
    profileImage: {
        type: String,
        default: "https://i.pinimg.com/736x/71/f3/51/71f3519243d136361d81df71724c60a0.jpg",
    },
    verificationStatus: {
        type: String,
        default: 'Pending'
    },
    status: {
        type: Boolean,
        default: true,
    },
    loginWith: {
        type: String,
        enum: ['Email', 'Google', 'Facebook'],
        default: 'Email'
    },
}, { timestamps: true });

export default mongoose.model("User", userSchema);
