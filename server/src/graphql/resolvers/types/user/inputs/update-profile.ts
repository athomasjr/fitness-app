import { IsNotEmpty } from 'class-validator'
import { Field, InputType } from 'type-graphql'
import { User } from '../../../../entities/user'

@InputType()
export class UpdateProfileInput implements Partial<User> {
	@Field({ nullable: true })
	about?: string
	@Field({ nullable: true })
	why?: string
	@Field({ nullable: true })
	inspiration0?: string
	@Field({ nullable: true })
	inspiration1?: string
	@Field({ nullable: true })
	inspiration2?: string
}
