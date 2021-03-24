import { prop as Property } from '@typegoose/typegoose'
import { Types } from 'mongoose'
import { Field, ID, Int, ObjectType } from 'type-graphql'
import { Nutrition } from './nutrition'

@ObjectType()
export class Food {
	@Field(() => ID)
	readonly _id?: Types.ObjectId

	@Field()
	@Property({ required: true })
	foodName!: string

	@Field(() => Int)
	@Property({ required: true, default: 1 })
	serving!: number

	@Field(() => Nutrition)
	@Property({ type: () => Nutrition, required: true })
	foodNutrition!: Nutrition
}
