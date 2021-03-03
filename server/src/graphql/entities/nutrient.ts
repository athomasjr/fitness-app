import { prop as Property } from '@typegoose/typegoose'
import { Field, Float, ObjectType } from 'type-graphql'

@ObjectType()
export class Nutrient {
	@Field()
	@Property({ required: true })
	nutrientName!: string

	@Field()
	@Property({ required: true })
	unitName!: string

	@Field(() => Float)
	@Property({ required: true })
	value!: number
}
