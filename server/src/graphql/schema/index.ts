import { buildSchema } from 'type-graphql'
import { TypegooseMiddleware } from '../../middleware/typegoose-middleware'

import { UserResolver } from '../resolvers/user-resolver'
import { MealResolver } from '../resolvers/meal-resolver'

export async function schema() {
	return await buildSchema({
		resolvers: [UserResolver, MealResolver],
		globalMiddlewares: [TypegooseMiddleware],
		emitSchemaFile: true,
	})
}
