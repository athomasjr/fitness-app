// import FoodLogDatePicker from '../components/foodLog/FoodLogDatePicker'
import { Loader } from 'semantic-ui-react'
import { useAuthContext } from '../context/auth/auth'
import MealTable from '../components/foodLog/MealTable'
import { MealName, useMealsQuery } from '../types/generated/graphql'
import moment from 'moment'
import { filterMeals } from '../utils/helpers/filterMeal'

export default function FoodLog() {
	const { user } = useAuthContext()
	const date = moment().format('YYYY-MM-DD')

	const { data, loading } = useMealsQuery({
		variables: {
			date: '20210313',
		},
	})

	const breakfast = filterMeals(data, loading, MealName.Breakfast)

	const lunch = filterMeals(data, loading, MealName.Lunch)

	const dinner = filterMeals(data, loading, MealName.Dinner)

	const snacks = filterMeals(data, loading, MealName.Snacks)
	// const breakfast =
	// 	!loading &&
	// 	data &&
	// 	data.meals.filter((meal) => meal.name === MealName.Breakfast)[0]
	// 		? data.meals.filter((meal) => meal.name === MealName.Breakfast)[0].foods
	// 		: []

	return loading ? (
		<Loader active inline='centered' />
	) : (
		<>
			{/* <FoodLogDatePicker food={user?.user} /> */}
			<h1>this is {user!.user.username}'s food log</h1>
			<MealTable meal={breakfast as any} mealType={MealName.Breakfast} />
			<MealTable meal={lunch as any} mealType={MealName.Lunch} />
			<MealTable meal={dinner as any} mealType={MealName.Dinner} />
			<MealTable meal={snacks as any} mealType={MealName.Snacks} />
		</>
	)
}
