import 'reflect-metadata'
import express, { urlencoded, json, Application } from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import { ApolloServer } from 'apollo-server-express'
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

	const apolloServer = new ApolloServer({
		schema: await schema(),
		formatError: formatErrors,
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
