import { prop as Property } from '@typegoose/typegoose'
import { Field, ObjectType } from 'type-graphql'
import { Nutrient } from './nutrient'

@ObjectType()
export class Nutrition {
	@Field(() => Nutrient, { nullable: true })
	@Property({ type: () => Nutrient })
	calories!: Nutrient

	@Field(() => Nutrient, { nullable: true })
	@Property({ type: () => Nutrient })
	protein!: Nutrient

	@Field(() => Nutrient, { nullable: true })
	@Property({ type: () => Nutrient })
	carbs!: Nutrient

	@Field(() => Nutrient, { nullable: true })
	@Property({ type: () => Nutrient })
	fat!: Nutrient
}
