import { prop as Property, getModelForClass } from '@typegoose/typegoose'
import { ObjectType, Field, ID, Float } from 'type-graphql'
import { Types } from 'mongoose'
import { Gender } from './types/user/enums'
import { Goals } from './goals'
import { Ref } from '../../types'

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
	height!: number

	@Field(() => Gender, { nullable: true })
	@Property({ enum: Gender })
	gender?: Gender

	@Field({ nullable: true })
	@Property()
	dateOfBirth?: string

	@Field({ nullable: true })
	@Property()
	about?: string

	@Field(() => Goals, { nullable: true })
	@Property({ required: true, _id: false, type: () => Goals, default: {} })
	goals?: Ref<Goals>
}

export const UserModel = getModelForClass(User, {
	schemaOptions: { timestamps: true },
})
