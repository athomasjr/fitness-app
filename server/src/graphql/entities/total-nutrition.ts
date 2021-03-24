import { prop as Property } from '@typegoose/typegoose'
import { Field, Float, ObjectType } from 'type-graphql'

@ObjectType()
export class TotalNutrition {
	@Field(() => Float)
	@Property({ required: true, default: 0 })
	calorieTotal?: number

	@Field(() => Float)
	@Property({ required: true, default: 0 })
	proteinTotal?: number

	@Field(() => Float)
	@Property({ required: true, default: 0 })
	carbsTotal?: number

	@Field(() => Float)
	@Property({ required: true, default: 0 })
	fatTotal?: number
}
