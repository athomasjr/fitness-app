import { IsString } from 'class-validator'
import { Field, InputType } from 'type-graphql'
import { Meal } from '../../../../entities/meal'
import { MealName } from '../../../../entities/types/meal/enums'
import { AddFoodInput } from './add-food'
import { NutritionInput } from './nutrition-input'

@InputType()
export class AddMealInput implements Partial<Meal> {
	@IsString()
	@Field(() => MealName)
	name!: MealName

	@Field(() => AddFoodInput)
	food!: AddFoodInput

	@Field(() => NutritionInput, { nullable: true })
	mealNutrition!: NutritionInput
}
