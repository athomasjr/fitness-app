import { Field, Float, InputType } from 'type-graphql'
import { Nutrient } from '../../../../entities/nutrient'

@InputType()
export class NutrientInput implements Partial<Nutrient> {
	@Field()
	nutrientName!: string

	@Field()
	unitName!: string

	@Field(() => Float)
	value!: number
}
