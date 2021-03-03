import { prop as Property } from '@typegoose/typegoose'
import { Field, ID, ObjectType } from 'type-graphql'
import { Types } from 'mongoose'
import { MealName } from './types/meal/enums'
import { Food } from './food'
import { Ref } from '../../types'
import { Nutrition } from './nutrition'

@ObjectType()
export class Meal {
	@Field(() => ID)
	readonly _id?: Types.ObjectId

	@Field(() => MealName)
	@Property({ required: true, enum: MealName })
	name!: MealName

	@Field(() => [Food], { nullable: 'items' })
	@Property({ required: true, type: () => Food, default: [] })
	foods!: Ref<Food>[]

	@Field(() => Nutrition, { nullable: true })
	@Property({ type: () => Nutrition, required: true, default: {} })
	mealNutrition!: Ref<Nutrition>
}
