import { prop as Property } from '@typegoose/typegoose'
import { Field, ObjectType, ID, Int } from 'type-graphql'
import { Types } from 'mongoose'
import { Nutrition } from './nutrition'
import { Ref } from '../../types'

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
	foodNutrition!: Ref<Nutrition>
}
