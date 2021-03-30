import { Field, InputType, Int } from 'type-graphql'
import { Meal } from '../../../../entities/meal'
import { MealName } from '../../../../entities/types/meal/enums'

@InputType()
export class DeleteFoodInput implements Partial<Meal> {
	@Field()
	userId!: string

	@Field(() => MealName)
	name!: MealName

	@Field()
	date!: string

	@Field(() => Int)
	foodIdx!: number
}
