import { ApolloServer } from 'apollo-server-express'
import cors from 'cors'
import { config } from 'dotenv'
import express, { Application, json, urlencoded } from 'express'
import { graphqlUploadExpress } from 'graphql-upload'
import 'reflect-metadata'
import { connectDb } from './config/db'
import { schema } from './graphql/schema'
import { formatErrors } from './utils/formatErrors'

async function main() {
	config()
	const app: Application = express()
	await connectDb()
	app.use(cors())
	app.use(json())
	app.use(urlencoded({ extended: true }))
	app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }))

	const apolloServer = new ApolloServer({
		schema: await schema(),
		formatError: formatErrors,
		uploads: false,
		context: ({ req, res }) => ({ req, res }),
	})

	apolloServer.applyMiddleware({ app })

	const PORT: number | string = process.env.PORT || 3001

	app.listen(PORT, () => console.log(`Server running on localhost:${PORT}`))
}

main().catch((error) => console.error(error))

//* Working with FoodCentral API

// const params = {
// 	api_key: process.env.FOOD_CENTRAL_API_KEY,
// 	query: 'cheddar cheese',
// 	dataType: ['Survey (FNDDS)', 'Branded'],
// 	pagesize: 5,
// }

// curl https://api.nal.usda.gov/fdc/v1/foods/search?api_key=xVtzAQZafgnCbtcAqCB7rS4rilyrQCIaR4io2skv&query=Cheddar%20Cheese
