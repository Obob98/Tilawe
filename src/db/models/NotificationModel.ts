import mongoose from 'mongoose'

const notificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
}, { timestamps: true })

const NotificationModel = mongoose.models.Notification || mongoose.model('Notification', notificationSchema)

export default NotificationModel
