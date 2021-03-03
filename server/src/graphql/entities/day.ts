import { Field, ID, ObjectType } from 'type-graphql'
import { prop as Property, getModelForClass } from '@typegoose/typegoose'
import { Types } from 'mongoose'
import { Ref } from '../../types'
import { User } from './user'
import moment from 'moment'
import { Nutrition } from './nutrition'
import { Meal } from './meal'

@ObjectType()
export class Day {
	@Field(() => ID)
	readonly _id!: Types.ObjectId

	@Field()
	@Property({
		required: true,
		default: moment().format('YYYY-MM-DD'),
		// unique: true,
	})
	date!: string

	@Field(() => User)
	@Property({ ref: User, required: true })
	user!: Ref<User>

	@Field(() => Nutrition, { nullable: true })
	@Property({ type: () => Nutrition, required: true, default: {} })
	dayNutrition!: Ref<Nutrition>

	@Field(() => [Meal], { nullable: 'items' })
	@Property({ type: () => Meal, required: true, default: [] })
	meals!: Meal[]
}

export const DayModel = getModelForClass(Day)
