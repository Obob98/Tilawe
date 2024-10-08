import { models, Schema, model } from 'mongoose'

const TempEmployeeSchema = new Schema({
    firstname: {
        type: String,
        required: [true, 'First name is required']
    },
    lastname: {
        type: String,
        required: [true, 'Last name is required']
    },
    job_title: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: [true, "email is required"]
    },
    salary: {
        type: Number,
        required: [true, 'Salary is required'],
        default: 0.00
    },
    reports_to: {
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    },
    branch_id: {
        type: Schema.Types.ObjectId,
        ref: 'Branch',
        required: true
    }
}, { timestamps: true })

const TempEmployeeModel = models.Employee || model('Employee', TempEmployeeSchema)
export default TempEmployeeModel
