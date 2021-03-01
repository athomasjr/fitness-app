import { prop as Property, getModelForClass } from '@typegoose/typegoose'
import { Types } from 'mongoose'
import { Field, ObjectType, ID, Float } from 'type-graphql'
import { Ref } from '../../types'
import { User } from './user'
import { Meal } from './meals'

@ObjectType()
export class NutrientObject {
	@Field()
	@Property({ required: true })
	nutrientName!: string

	@Field()
	@Property({ required: true })
	unitName!: string

	@Field(() => Float)
	@Property({ required: true })
	value!: number
}

@ObjectType()
export class Nutrition {
	@Field(() => NutrientObject)
	@Property({ required: true, type: () => NutrientObject })
	calories!: NutrientObject

	@Field(() => NutrientObject)
	@Property({ required: true, type: () => NutrientObject })
	protein!: NutrientObject

	@Field(() => NutrientObject)
	@Property({ required: true, type: () => NutrientObject })
	carbs!: NutrientObject

	@Field(() => NutrientObject)
	@Property({ required: true, type: () => NutrientObject })
	fat!: NutrientObject

	@Field(() => NutrientObject)
	@Property({ required: true, type: () => NutrientObject })
	sugar!: NutrientObject

	@Field(() => NutrientObject)
	@Property({ required: true, type: () => NutrientObject })
	fiber!: NutrientObject

	@Field(() => NutrientObject)
	@Property({ required: true, type: () => NutrientObject })
	sodium!: NutrientObject

	@Field(() => NutrientObject)
	@Property({ required: true, type: () => NutrientObject })
	calcium!: NutrientObject

	@Field(() => NutrientObject)
	@Property({ required: true, type: () => NutrientObject })
	iron!: NutrientObject

	@Field(() => NutrientObject)
	@Property({ required: true, type: () => NutrientObject })
	cholesterol!: NutrientObject

	@Field(() => NutrientObject)
	@Property({ required: true, type: () => NutrientObject })
	potassium!: NutrientObject

	@Field(() => NutrientObject)
	@Property({ required: true, type: () => NutrientObject })
	vitaminA!: NutrientObject

	@Field(() => NutrientObject)
	@Property({ required: true, type: () => NutrientObject })
	vitaminC!: NutrientObject
}

@ObjectType()
export class Day {
	@Field(() => ID)
	readonly _id!: Types.ObjectId

	@Field(() => User)
	@Property({ ref: User, required: true })
	user!: Ref<User>

	@Field()
	@Property({ required: true, default: Date.now() })
	date!: Date

	@Field(() => Nutrition)
	@Property({ required: true, type: () => Nutrition, default: {} })
	nutrition!: Nutrition

	@Field(() => [Meal], { nullable: 'items' })
	@Property({ ref: 'Meal' })
	meals?: Ref<Meal>[]
}

export const DayModel = getModelForClass(Day, {
	schemaOptions: { timestamps: true },
})

// @Field(() => [Like], { nullable: 'items' })
// @Property({ type: () => Like, default: [] })
// likes?: Like[]
