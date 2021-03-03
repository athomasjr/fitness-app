import { registerEnumType } from 'type-graphql'

export enum MealName {
	BREAKFAST = 'Breakfast',
	LUNCH = 'Lunch',
	DINNER = 'Dinner',
	SNACKS = 'Snacks',
}

registerEnumType(MealName, {
	name: 'MealName',
})
