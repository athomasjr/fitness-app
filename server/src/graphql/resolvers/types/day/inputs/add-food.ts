import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { Field, InputType, Float } from 'type-graphql'
import { Food } from '../../../../entities/food'
import { NutritionInput } from './nutrition-input'

@InputType()
export class AddFoodInput implements Partial<Food> {
	@Field()
	@IsString()
	@IsNotEmpty()
	foodName!: string

	@IsNumber()
	@IsNotEmpty()
	@Field(() => Float)
	serving!: number

	@Field(() => NutritionInput, { nullable: true })
	foodNutrition!: NutritionInput
}
