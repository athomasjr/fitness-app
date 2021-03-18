import { MealName, MealsQuery } from '../../types/generated/graphql'

export function filterMeals(
	data: MealsQuery | undefined,
	loading: boolean,
	mealName: MealName
) {
	return !loading &&
		data &&
		data.meals.filter((meal) => meal.name === mealName)[0]
		? data.meals.filter((meal) => meal.name === MealName.Breakfast)[0].foods
		: []
}
