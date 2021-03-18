import { Field, InputType } from 'type-graphql'
import { Nutrition } from '../../../../entities/nutrition'
import { NutrientInput } from './nutrient-input'

@InputType()
export class NutritionInput implements Partial<Nutrition> {
	@Field(() => NutrientInput, { nullable: true })
	calories!: NutrientInput

	@Field(() => NutrientInput, { nullable: true })
	protein!: NutrientInput

	@Field(() => NutrientInput, { nullable: true })
	carbs!: NutrientInput

	@Field(() => NutrientInput, { nullable: true })
	fat!: NutrientInput

	@Field(() => NutrientInput, { nullable: true })
	sugar!: NutrientInput

	@Field(() => NutrientInput, { nullable: true })
	fiber!: NutrientInput

	@Field(() => NutrientInput, { nullable: true })
	sodium!: NutrientInput

	// @Field(() => NutrientInput, { nullable: true })
	// calcium!: NutrientInput

	// @Field(() => NutrientInput, { nullable: true })
	// iron!: NutrientInput

	// @Field(() => NutrientInput, { nullable: true })
	// cholesterol!: NutrientInput

	// @Field(() => NutrientInput, { nullable: true })
	// potassium!: NutrientInput

	// @Field(() => NutrientInput, { nullable: true })
	// vitaminA!: NutrientInput

	// @Field(() => NutrientInput, { nullable: true })
	// vitaminC!: NutrientInput
}
