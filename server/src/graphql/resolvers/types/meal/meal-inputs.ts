import { Field, InputType } from 'type-graphql'
import { MealType } from '../../../../types/meals/meal-enums'
import { Food } from '../../../entities/food'
import { Meal } from '../../../entities/meals'

@InputType()
export class CreateMealInput implements Partial<Meal> {
	@Field(() => MealType)
	type!: MealType

	@Field(() => [Food], { nullable: 'items' })
	foods!: Food[]
}
