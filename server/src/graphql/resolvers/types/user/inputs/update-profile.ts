import { InputType } from 'type-graphql'
import { User } from '../../../../entities/user'

@InputType()
export class UpdateProfileInput implements Partial<User> {}
