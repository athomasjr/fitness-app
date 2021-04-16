import { getModelForClass, prop as Property } from '@typegoose/typegoose'
import moment from 'moment'
import { Types } from 'mongoose'
import { Field, ID, ObjectType } from 'type-graphql'
import { Ref } from '../../types'
import { Meal } from './meal'
import { TotalNutrition } from './total-nutrition'
import { User } from './user'

@ObjectType()
export class Day {
	@Field(() => ID)
	readonly _id!: Types.ObjectId

	@Field()
	@Property({
		required: true,
		default: moment().format('YYYY-MM-DD'),
	})
	date!: string

	@Field(() => User)
	@Property({ ref: User, required: true })
	user!: Ref<User>

	@Field(() => TotalNutrition, { nullable: true })
	@Property({ type: () => TotalNutrition, required: true, default: {} })
	dayNutrition!: TotalNutrition

	@Field(() => Meal, { nullable: true })
	@Property({ type: () => Meal, required: true, default: {} })
	breakfast!: Meal

	@Field(() => Meal, { nullable: true })
	@Property({ type: () => Meal, required: true, default: {} })
	lunch!: Meal

	@Field(() => Meal, { nullable: true })
	@Property({ type: () => Meal, required: true, default: {} })
	dinner!: Meal

	@Field(() => Meal, { nullable: true })
	@Property({ type: () => Meal, required: true, default: {} })
	snacks!: Meal
}

export const DayModel = getModelForClass(Day)
