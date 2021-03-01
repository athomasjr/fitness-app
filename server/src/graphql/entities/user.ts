import { prop as Property, getModelForClass } from '@typegoose/typegoose'
import { ObjectType, Field, ID } from 'type-graphql'
import { Types } from 'mongoose'
import { DietProfile } from './diet-profile'

@ObjectType()
export class User {
	@Field(() => ID)
	readonly _id!: Types.ObjectId

	@Field()
	@Property({ required: true, unique: true, minlength: 4, trim: true })
	username!: string

	@Field()
	@Property({ required: true, unique: true, trim: true })
	email!: string

	@Property({ required: true, minlength: 6 })
	password!: string

	@Field()
	@Property({ required: true })
	dateOfBirth!: Date

	@Field({ nullable: true })
	@Property()
	about?: string

	@Field({ nullable: true })
	@Property()
	avatar?: string

	@Field(() => DietProfile, { nullable: true })
	@Property({ type: () => DietProfile, default: {} })
	dietProfile?: DietProfile
}

export const UserModel = getModelForClass(User, {
	schemaOptions: { timestamps: true },
})
