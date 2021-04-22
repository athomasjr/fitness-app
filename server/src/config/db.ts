import { config } from 'dotenv'
import mongoose from 'mongoose'
config()

export async function connectDb() {
	const uri: any = process.env.MONGODB_URI
	try {
		const conn = await mongoose.connect(uri, {
			useCreateIndex: true,
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useFindAndModify: false,
		})
		console.log(`MongoDB connected to ${conn.connection.host}`)
	} catch (error) {
		console.error(`Error: ${error.message}`)
		// process.exit(1)
	}
}
