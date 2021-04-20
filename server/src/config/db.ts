import { config } from 'dotenv'
import mongoose from 'mongoose'
config()

export async function connectDb(mongoUri: string) {
	try {
		const conn = await mongoose.connect(mongoUri, {
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
