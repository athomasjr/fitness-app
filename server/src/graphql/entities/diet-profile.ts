import { prop as Property } from '@typegoose/typegoose'
import { Field, Float, ObjectType, registerEnumType } from 'type-graphql'

export enum Gender {
	MALE = 'male',
	FEMALE = 'female',
}

registerEnumType(Gender, {
	name: 'Gender',
})

@ObjectType()
export class DietProfile {
	@Field(() => Float, { nullable: true })
	@Property()
	startingWeight!: number

	@Field(() => Float, { nullable: true })
	@Property()
	currentWeight!: number

	@Field(() => Float, { nullable: true })
	@Property()
	height!: number
	@Field(() => Float, { nullable: true })
	@Property()
	goalWeight!: number

	@Field(() => Gender, { nullable: true })
	@Property({ enum: Gender })
	gender?: Gender
}
