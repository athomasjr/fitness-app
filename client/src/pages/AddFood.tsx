import { useParams } from 'react-router-dom'
import FoodSearch from '../components/foodLog/FoodSearch'
import FoodSelect from '../components/foodLog/FoodSelect'
import { MealName } from '../types/generated/graphql'

export default function AddFood() {
	const params: MealName = useParams()
	const mealName = params['mealType' as any]

	console.log(mealName)

	return (
		<>
			<FoodSearch />
			<FoodSelect mealName={mealName as any} />
		</>
	)
}
