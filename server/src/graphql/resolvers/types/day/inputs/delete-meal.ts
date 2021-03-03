import { Field, InputType } from 'type-graphql'
import { Meal } from '../../../../entities/meal'
import { MealName } from '../../../../entities/types/meal/enums'

@InputType()
export class DeleteMealInput implements Partial<Meal> {
	@Field()
	date!: string

	@Field(() => MealName)
	name!: MealName
}
