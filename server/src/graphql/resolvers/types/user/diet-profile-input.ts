import { Field, Float, InputType } from 'type-graphql'
import { DietProfile, Gender } from '../../../entities/diet-profile'

@InputType()
export class DietProfileInput implements Partial<DietProfile> {
	@Field(() => Float, { nullable: true })
	startingWeight!: number

	@Field(() => Float)
	currentWeight!: number

	@Field(() => Float)
	height!: number

	@Field(() => Float)
	goalWeight!: number

	@Field(() => Gender)
	gender?: Gender
}
