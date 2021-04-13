import { prop as Property } from '@typegoose/typegoose'
import { Field, Float, ObjectType } from 'type-graphql'

@ObjectType()
export class Goals {
	@Field(() => Float, { nullable: true })
	@Property({ required: true, default: 0 })
	startingWeight?: number

	@Field(() => Float, { nullable: true })
	@Property({ required: true, default: 0 })
	currentWeight?: number

	@Field(() => Float, { nullable: true })
	@Property({ required: true, default: 0 })
	goalWeight?: number
}
