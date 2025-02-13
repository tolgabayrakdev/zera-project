import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    role: "admin" | "bayi" | "magaza" | "user"; 
}

const userSchema: Schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin", "bayi", "magaza", "user"], 
        default: "user",
        immutable: true
    },
});

export default mongoose.model<IUser>("User", userSchema);
