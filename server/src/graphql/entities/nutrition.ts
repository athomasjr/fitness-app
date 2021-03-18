import { Field, ObjectType } from 'type-graphql'
import { prop as Property } from '@typegoose/typegoose'
import { Ref } from '../../types'
import { Nutrient } from './nutrient'

@ObjectType()
export class Nutrition {
	@Field(() => Nutrient, { nullable: true })
	@Property({ type: () => Nutrient })
	calories!: Ref<Nutrient>

	@Field(() => Nutrient, { nullable: true })
	@Property({ type: () => Nutrient })
	protein!: Ref<Nutrient>

	@Field(() => Nutrient, { nullable: true })
	@Property({ type: () => Nutrient })
	carbs!: Ref<Nutrient>

	@Field(() => Nutrient, { nullable: true })
	@Property({ type: () => Nutrient })
	fat!: Ref<Nutrient>

	@Field(() => Nutrient, { nullable: true })
	@Property({ type: () => Nutrient })
	sugar!: Ref<Nutrient>

	@Field(() => Nutrient, { nullable: true })
	@Property({ type: () => Nutrient })
	fiber!: Ref<Nutrient>

	@Field(() => Nutrient, { nullable: true })
	@Property({ type: () => Nutrient })
	sodium!: Ref<Nutrient>

	// @Field(() => Nutrient, { nullable: true })
	// @Property({ type: () => Nutrient })
	// calcium!: Ref<Nutrient>

	// @Field(() => Nutrient, { nullable: true })
	// @Property({ type: () => Nutrient })
	// iron!: Ref<Nutrient>

	// @Field(() => Nutrient, { nullable: true })
	// @Property({ type: () => Nutrient })
	// cholesterol!: Ref<Nutrient>

	// @Field(() => Nutrient, { nullable: true })
	// @Property({ type: () => Nutrient })
	// potassium!: Ref<Nutrient>

	// @Field(() => Nutrient, { nullable: true })
	// @Property({ type: () => Nutrient })
	// vitaminA!: Ref<Nutrient>

	// @Field(() => Nutrient, { nullable: true })
	// @Property({ type: () => Nutrient })
	// vitaminC!: Ref<Nutrient>
}
