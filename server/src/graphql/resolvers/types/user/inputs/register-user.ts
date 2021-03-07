import { MinLength, MaxLength, IsEmail } from 'class-validator'
import { InputType, Field } from 'type-graphql'
import { IsEmailAlreadyExists } from '../../../../../utils/validators/isEmailAlreadyExists'
import { IsUserAlreadyExists } from '../../../../../utils/validators/isUserAlreadyExists'
import { Match } from '../../../../../utils/validators/Match'
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

	@Match('password', { message: 'Passwords must match' })
	@Field()
	confirmPassword!: string

	@Field()
	@IsEmail()
	@IsEmailAlreadyExists({ message: 'Email already taken' })
	email!: string

	// @Field()
	// dateOfBirth!: string

	// @Field(() => Float, { nullable: true })
	// startingWeight!: number

	// @Field(() => Float, { nullable: true })
	// currentWeight!: number

	// @Field(() => Float, { nullable: true })
	// goalWeight!: number
}
