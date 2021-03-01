import { MinLength, MaxLength, IsEmail, IsDate } from 'class-validator'
import { InputType, Field, Float } from 'type-graphql'
import { IsEmailAlreadyExists } from '../../../../../utils/validators/isEmailAlreadyExists'
import { IsUserAlreadyExists } from '../../../../../utils/validators/isUserAlreadyExists'
import { User } from '../../../../entities/user'

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

	@Field(() => Float, { nullable: true })
	startingWeight!: number

	@Field(() => Float, { nullable: true })
	currentWeight!: number

	@Field(() => Float, { nullable: true })
	goalWeight!: number
}
