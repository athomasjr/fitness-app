import { Field, Float, InputType } from 'type-graphql'
import { Goals } from '../../../../entities/goals'

@InputType()
export class UserGoalsInput implements Partial<Goals> {
	@Field(() => Float, { nullable: true })
	startingWeight!: number

	@Field(() => Float, { nullable: true })
	currentWeight!: number

	@Field(() => Float, { nullable: true })
	goalWeight!: number
}
