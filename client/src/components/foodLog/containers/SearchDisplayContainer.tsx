import { useHistory, useParams } from 'react-router-dom'
import {
	Food,
	MealName,
	useAddMealMutation,
} from '../../../types/generated/graphql'
import SearchDisplay, { ISearchDisplayProps } from '../SearchDisplay'

export interface ISearchDisplayContainerProps {
	foods: Food[]
}

export default function SearchDisplayContainer({
	foods,
}: ISearchDisplayContainerProps) {
	const history = useHistory()
	const { date, mealType } = useParams<{ date: string; mealType: MealName }>()

	let name: MealName = MealName.Snacks

	switch (mealType) {
		case 'BREAKFAST':
			name = MealName.Breakfast
			break
		case 'LUNCH':
			name = MealName.Lunch
			break
		case 'DINNER':
			name = MealName.Dinner
			break
	}

	const [addMeal] = useAddMealMutation()

	async function handleAddMeal(food: Food) {
		try {
			await addMeal({
				variables: {
					addMealInput: {
						food: {
							foodName: food.foodName,
							serving: 1,
							foodNutrition: {
								calories: {
									value: food.foodNutrition.calories?.value || 0,
									unitName: food.foodNutrition.calories?.unitName || '',
									nutrientName: food.foodNutrition.calories?.nutrientName || '',
								},
								protein: {
									value: food.foodNutrition.protein?.value || 0,
									unitName: food.foodNutrition.protein?.unitName || '',
									nutrientName: food.foodNutrition.protein?.nutrientName || '',
								},
								fat: {
									value: food.foodNutrition.fat?.value || 0,
									unitName: food.foodNutrition.fat?.unitName || '',
									nutrientName: food.foodNutrition.fat?.nutrientName || '',
								},
								carbs: {
									value: food.foodNutrition.carbs?.value || 0,
									unitName: food.foodNutrition.carbs?.unitName || '',
									nutrientName: food.foodNutrition.carbs?.nutrientName || '',
								},
							},
						},
						date,
						name,
					},
				},
			})
			history.push('/food/log')
		} catch (error) {
			console.error(error.message)
		}
	}
	const props: ISearchDisplayProps = { handleAddMeal, foods }
	return <SearchDisplay {...props} />
}
