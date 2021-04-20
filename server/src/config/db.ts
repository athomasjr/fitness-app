import { config } from 'dotenv'
import mongoose from 'mongoose'
config()

export async function connectDb() {
	try {
		const conn = await mongoose.connect(`${process.env.MONGO_URI}`, {
			useCreateIndex: true,
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useFindAndModify: false,
		})
		console.log(`MongoDB connected to ${conn.connection.host}`)
	} catch (error) {
		console.error(`Error: ${error.message}`)
		process.exit(1)
	}
}
