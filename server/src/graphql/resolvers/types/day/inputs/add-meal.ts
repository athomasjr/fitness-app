import { IsNotEmpty, IsString } from 'class-validator'
import { Field, InputType } from 'type-graphql'
import { Meal } from '../../../../entities/meal'
import { MealName } from '../../../../entities/types/meal/enums'
import { AddFoodInput } from './add-food'

@InputType()
export class AddMealInput implements Partial<Meal> {
	@Field()
	@IsNotEmpty({ message: 'Date is required' })
	date!: string

	@IsString()
	@Field(() => MealName)
	name!: MealName

	@Field(() => AddFoodInput)
	food!: AddFoodInput

	// @Field(() => NutritionInput, { nullable: true })
	// mealNutrition!: NutritionInput
}
