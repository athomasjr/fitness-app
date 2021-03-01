import { prop as Property } from '@typegoose/typegoose'
import { Types } from 'mongoose'
import { ObjectType, Field, ID, Float } from 'type-graphql'
import { Nutrition } from './day'

@ObjectType()
export class Food {
	@Field(() => ID)
	readonly _id!: Types.ObjectId

	@Field()
	@Property({ required: true })
	name!: string

	@Field(() => Float)
	@Property({ required: true })
	serving!: number

	@Field(() => Nutrition)
	@Property({ required: true, type: () => Nutrition })
	nutrition!: Nutrition
}
