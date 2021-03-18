import { prop as Property } from '@typegoose/typegoose'
import { Types } from 'mongoose'
import { Field, Float, ID, ObjectType } from 'type-graphql'
import { Ref } from '../../types'
import { Food } from './food'
import { MealName } from './types/meal/enums'

@ObjectType()
export class MealNutrition {
	@Field(() => Float, { nullable: true })
	@Property()
	calorieTotal!: number

	@Field(() => Float, { nullable: true })
	@Property()
	proteinTotal!: number

	@Field(() => Float, { nullable: true })
	@Property()
	carbsTotal!: number

	@Field(() => Float, { nullable: true })
	@Property()
	fatTotal!: number

	@Field(() => Float, { nullable: true })
	@Property()
	sugarTotal!: number

	@Field(() => Float, { nullable: true })
	@Property()
	fiberTotal!: number

	@Field(() => Float, { nullable: true })
	@Property()
	sodiumTotal!: number
}

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

	// @Field(() => [Nutrition], { nullable: true })
	// @Property({ type: () => Nutrition, required: true, default: [] })
	// mealNutrition!: Ref<Nutrition>[]

	@Field(() => MealNutrition, { nullable: true })
	@Property({ type: () => MealNutrition, required: true, default: {} })
	mealNutrition?: Ref<MealNutrition>
}
