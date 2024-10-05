import mongoose from 'mongoose'

const connectDB = async () => {
    if (mongoose.connections[0].readyState) {
        return
    }

    const URI = process.env.MONGO_URI

    if (!URI) throw new Error('Invalid or missing connection string')

    await mongoose.connect(URI, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    })
    console.log('MongoDB Connected')
}

export default connectDB
