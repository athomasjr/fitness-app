import { ApolloServer } from 'apollo-server-express'
import cors from 'cors'
import dotenv from 'dotenv'
import express, { Application, json, urlencoded } from 'express'
import { graphqlUploadExpress } from 'graphql-upload'
import path from 'path'
import 'reflect-metadata'
import { connectDb } from './config/db'
import { schema } from './graphql/schema'
import { formatErrors } from './utils/formatErrors'
dotenv.config()

async function main() {
	const app: Application = express()
	await connectDb()

	app.use(cors())
	app.use(json())
	app.use(urlencoded({ extended: true }))
	app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }))
	app.use(express.static(path.join(__dirname, '../../client/build')))

	app.get('/*', function (_req, res) {
		res.sendFile(path.join(__dirname, '../../client/build', 'index.html'))
	})

	const apolloServer = new ApolloServer({
		schema: await schema(),
		formatError: formatErrors,
		uploads: false,
		context: ({ req, res }) => ({ req, res }),
	})

	apolloServer.applyMiddleware({ app })

	const PORT = process.env.PORT ? process.env.PORT : 3001

	app.listen(PORT, () => console.log(`Server running on localhost:${PORT}`))
}

main().catch((error) => console.error(error))
