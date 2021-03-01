import { Field, InputType } from 'type-graphql'
import { IsNotEmpty, IsString } from 'class-validator'
import { User } from '../../../../entities/user'
import { IsUserNotFound } from '../../../../../utils/validators/isUserNotFound'

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
