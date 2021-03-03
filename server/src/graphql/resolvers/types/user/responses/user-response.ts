import { Field, ObjectType } from 'type-graphql'
import { User } from '../../../../entities/user'

@ObjectType()
export class UserResponse {
	@Field(() => User)
	user!: User

	@Field()
	token!: string
}
