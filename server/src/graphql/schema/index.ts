import { buildSchema } from 'type-graphql'
import { TypegooseMiddleware } from '../../middleware/typegoose-middleware'

import { UserResolver } from '../resolvers/user-resolver'

export async function schema() {
	return await buildSchema({
		resolvers: [UserResolver],
		globalMiddlewares: [TypegooseMiddleware],
		emitSchemaFile: true,
	})
}
