import { Field, InputType } from 'type-graphql'
import {
	IsDate,
	IsEmail,
	IsNotEmpty,
	IsString,
	MaxLength,
	MinLength,
} from 'class-validator'
import { User } from '../../../entities/user'
import { DietProfileInput } from './diet-profile-input'
import { IsEmailAlreadyExists } from '../../../../utils/validators/isEmailAlreadyExists'
import { IsUserNotFound } from '../../../../utils/validators/isUserNotFound'
import { IsUserAlreadyExists } from '../../../../utils/validators/isUserAlreadyExists'

@InputType()
export class RegisterUserInput implements Partial<User> {
	@Field()
	@MinLength(4, { message: 'Username must be at least 4 characters' })
	@MaxLength(15, { message: "Username can't be longer than 15 characters" })
	@IsUserAlreadyExists({ message: 'Username already taken' })
	username!: string

	@Field()
	@MinLength(6, { message: 'Password must be at least 6 characters' })
	password!: string

	@Field()
	confirmPassword!: string

	@Field()
	@IsEmail()
	@IsEmailAlreadyExists({ message: 'Email already taken' })
	email!: string

	@Field()
	@IsDate()
	dateOfBirth!: Date

	@Field({ nullable: true })
	about?: string

	@Field({ nullable: true })
	avatar?: string

	@Field(() => DietProfileInput, { nullable: true })
	dietProfile?: DietProfileInput
}

@InputType()
export class LoginUserInput implements Partial<User> {
	@Field()
	@IsString()
	@IsNotEmpty()
	@IsUserNotFound({ message: 'User not found' })
	username!: string

	@Field()
	@IsNotEmpty()
	@IsString()
	password!: string
}
