import { buildSchema } from 'type-graphql'
import { TypegooseMiddleware } from '../../middleware/typegoose-middleware'
import { DayResolver } from '../resolvers/day-resolver'

import { UserResolver } from '../resolvers/user-resolver'

export async function schema() {
	return await buildSchema({
		resolvers: [UserResolver, DayResolver],
		globalMiddlewares: [TypegooseMiddleware],
		emitSchemaFile: true,
	})
}
