import mongoose, { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'viewer'
    }
}, { timestamps: true })

const UserModel = models.User || model('User', UserSchema)

export default UserModel