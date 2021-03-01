import { prop as Property } from '@typegoose/typegoose'
import { Types } from 'mongoose'
import { Field, ID, ObjectType } from 'type-graphql'
import { MealType } from '../../types/meals/meal-enums'
import { Food } from './food'

@ObjectType()
export class Meal {
	@Field(() => ID)
	readonly _id!: Types.ObjectId

	@Field(() => MealType)
	@Property({ required: true, type: String, enum: MealType })
	type!: MealType

	@Field(() => [Food], { nullable: 'items' })
	@Property({ required: true, type: () => Food, default: [] })
	foods!: Food[]
}
