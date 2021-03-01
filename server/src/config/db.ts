import mongoose from 'mongoose'

export async function connectDb() {
	const mongoUri: string = process.env.MONGO_URI!.toString()
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
