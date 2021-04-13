import { getModelForClass, prop as Property } from '@typegoose/typegoose'
import { Types } from 'mongoose'
import { Field, Float, ID, ObjectType } from 'type-graphql'
import { Goals } from './goals'
import { Gender } from './types/user/enums'

@ObjectType()
export class User {
	@Field(() => ID)
	readonly _id!: Types.ObjectId

	@Field()
	@Property({ required: true, trim: true })
	username!: string

	@Field()
	@Property({
		required: true,
		trim: true,
	})
	email!: string

	@Property({ required: true, minlength: 6 })
	password!: string

	@Field({ nullable: true })
	@Property()
	avatar?: string

	@Field(() => Float, { nullable: true })
	@Property()
	height?: number

	@Field(() => Gender)
	@Property({ enum: Gender, required: true })
	gender!: Gender

	@Field()
	@Property({ required: true })
	dateOfBirth!: string

	@Field({ nullable: true })
	@Property()
	about?: string

	@Field({ nullable: true })
	@Property()
	why?: string

	@Field(() => [String], { nullable: true })
	@Property({
		type: () => [String],
		default: [],
		validate: {
			validator: (v) => v.length <= 4,
			message: 'Can only have 3 inspirations',
		},
	})
	inspirations?: string[]

	@Field(() => Goals, { nullable: true })
	@Property({ required: true, _id: false, type: () => Goals, default: {} })
	goals?: Goals

	@Field()
	createdAt!: Date
	@Field()
	updatedAt!: Date
}

export const UserModel = getModelForClass(User, {
	schemaOptions: { timestamps: true },
})
