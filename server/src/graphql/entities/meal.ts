import { prop as Property } from '@typegoose/typegoose'
import { Types } from 'mongoose'
import { Field, ID, ObjectType } from 'type-graphql'
import { Food } from './food'
import { TotalNutrition } from './total-nutrition'
import { MealName } from './types/meal/enums'

@ObjectType()
export class Meal {
	@Field(() => ID)
	readonly _id?: Types.ObjectId

	@Field(() => MealName)
	@Property({ required: true, enum: MealName })
	name!: MealName

	@Field(() => [Food], { nullable: 'items' })
	@Property({ required: true, type: () => Food, default: [] })
	foods!: Food[]

	@Field(() => TotalNutrition, { nullable: true })
	@Property({ type: () => TotalNutrition, required: true, default: {} })
	mealNutrition?: TotalNutrition
}
