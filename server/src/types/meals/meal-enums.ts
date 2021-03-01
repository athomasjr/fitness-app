import { registerEnumType } from 'type-graphql'

export enum MealType {
	BREAKFAST = 'breakfast',
	LUNCH = 'lunch',
	DINNER = 'dinner',
	SNACKS = 'snacks',
}

registerEnumType(MealType, {
	name: 'MealType',
})
