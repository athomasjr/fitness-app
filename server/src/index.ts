import { ApolloServer } from 'apollo-server-express'
import cors from 'cors'
import { config } from 'dotenv'
import express, { Application, json, urlencoded } from 'express'
import { graphqlUploadExpress } from 'graphql-upload'
import path from 'path'
import 'reflect-metadata'
import { connectDb } from './config/db'
import { schema } from './graphql/schema'
import { formatErrors } from './utils/formatErrors'

config()
const PORT: any | string = process.env.PORT || 3001

async function main() {
	const mongoUri: string = process.env.MONGO_URI!
	const app: Application = express()
	await connectDb(mongoUri)
	app.use(cors())
	app.use(json())
	app.use(urlencoded({ extended: true }))
	app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }))
	app.use(express.static(path.join(__dirname, 'client/build')))

	app.get('*', (_req, res) => {
		res.sendFile(path.join(__dirname + '/client/build/index.html'))
	})

	const apolloServer = new ApolloServer({
		schema: await schema(),
		formatError: formatErrors,
		uploads: false,
		context: ({ req, res }) => ({ req, res }),
	})

	apolloServer.applyMiddleware({ app })

	app.listen(PORT, () => console.log(`Server running on localhost:${PORT}`))
}

main().catch((error) => console.error(error))
