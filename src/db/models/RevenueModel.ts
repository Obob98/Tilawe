import { models, Schema, model } from 'mongoose'

const RevenueSchema = new Schema({
    city: {
        type: String,
        required: true
    },
    month: {
        type: String,
        required: true
    },
    revenue: {
        type: Number,
        required: true,
        default: 0.00
    }
}, { timestamps: true })

const RevenueModel = models.Revenue || model('Revenue', RevenueSchema)
export default RevenueModel