import { Request, Response } from 'express'
import { GraphQLScalarType, Kind } from 'graphql'
import { Types } from 'mongoose'
import { User } from '../graphql/entities/user'

export type MyContext = {
	req: Request
	res: Response
	payload?: User
}

export type Ref<T> = T | Types.ObjectId

export const ObjectIdScalar = new GraphQLScalarType({
	name: 'ObjectId',
	description: 'Mongo object id scalar type',
	parseValue(value: string) {
		return new Types.ObjectId(value) // value from the client input variables
	},
	serialize(value: Types.ObjectId) {
		return value.toHexString() // value sent to the client
	},
	parseLiteral(ast) {
		if (ast.kind === Kind.STRING) {
			return new Types.ObjectId(ast.value) // value from the client query
		}
		return null
	},
})
