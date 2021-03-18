import { MealName } from '../../types/generated/graphql'
import { capitalize } from '../../utils/helpers/capitalize'

export interface IFoodSelectProps {
	mealName: MealName
}

export default function FoodSelect({ mealName }: IFoodSelectProps) {
	return <h1>Add food to {capitalize(mealName.toLowerCase())}</h1>
}
