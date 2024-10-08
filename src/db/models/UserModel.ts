import { model, models, Schema } from "mongoose";
import NotificationModel from "./NotificationModel";

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

UserSchema.pre('save', async function (next) {

    const notification = {
        message: 'your default password is 1234, make sure to update as soon as possible',
        type: 'account creation',
        userId: this._id
    }

    await NotificationModel.create(notification)

    next();
});

const UserModel = models.User || model('User', UserSchema)

export default UserModel