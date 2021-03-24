import axios from 'axios'
import { useEffect, useState } from 'react'
import { Food } from '../types/generated/graphql'
export const API_ENDPOINT = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${process.env.REACT_APP_FOOD_CENTRAL_API_KEY}`

export default function useFetch(urlParams: string) {
	const [data, setData] = useState<Food[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState({ show: false, msg: '' })

	async function fetchFoods(url: string) {
		setLoading(true)
		try {
			const result = await (await axios.get(url)).data

			const food = result.foods.map((food: any) => {
				return (food = {
					_id: food.fdcId,
					foodName: food.description,
					foodNutrition: {
						calories: food.foodNutrients.filter(
							(i: any) => i.nutrientId === 1008
						)[0],
						protein: food.foodNutrients.filter(
							(i: any) => i.nutrientId === 1003
						)[0],
						carbs: food.foodNutrients.filter(
							(i: any) => i.nutrientId === 1005
						)[0],
						fat: food.foodNutrients.filter(
							(i: any) => i.nutrientId === 1004
						)[0],
						sugar: food.foodNutrients.filter(
							(i: any) => i.nutrientId === 2000
						)[0],
						fiber: food.foodNutrients.filter(
							(i: any) => i.nutrientId === 1079
						)[0],
						sodium: food.foodNutrients.filter(
							(i: any) => i.nutrientId === 1093
						)[0],
					},
				})
			})

			setData([...food])
		} catch (error) {
			setError({ show: true, msg: 'Sorry... something went wrong' })
			console.error(error)
		}
		setLoading(false)
	}

	useEffect(() => {
		fetchFoods(`${API_ENDPOINT}${urlParams}`)
	}, [urlParams])

	return { data, loading, error }
}
