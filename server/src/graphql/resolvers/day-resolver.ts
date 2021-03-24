import { AuthenticationError } from 'apollo-server-express'
import moment from 'moment'
import {
	Arg,
	Ctx,
	Mutation,
	Query,
	Resolver,
	UseMiddleware,
} from 'type-graphql'
import { isAuth } from '../../middleware/isAuth'
import { MyContext } from '../../types'
import { Day, DayModel } from '../entities/day'
import { Food } from '../entities/food'
import { Meal } from '../entities/meal'
import { MealName } from '../entities/types/meal/enums'
import { AddMealInput } from './types/day/inputs/add-meal'

@Resolver(Day)
export class DayResolver {
	@Query(() => Day)
	@UseMiddleware(isAuth)
	async day(
		@Arg('date') date: string,
		@Ctx() { payload }: MyContext
	): Promise<Day> {
		try {
			const user = payload
			date = moment(date).format('YYYY-MM-DD')
			console.log(user)

			const day = await DayModel.findOne({ date, user })
			if (!day) {
				throw new AuthenticationError('Day not found')
			}

			return day
		} catch (error) {
			throw new Error(error)
		}
	}

	@Query(() => [Meal])
	@UseMiddleware(isAuth)
	async meals(
		@Arg('date') date: string,
		@Arg('userId') userId: string
	): Promise<Meal[]> {
		// const user = payload

		date = moment(date).format('YYYY-MM-DD')

		try {
			const day = await DayModel.findOne({ date, user: userId })
			if (!day) {
				throw new AuthenticationError('Day not found')
			}

			const breakfast = day.breakfast
			const lunch = day.lunch
			const dinner = day.dinner
			const snacks = day.snacks

			return [breakfast, lunch, dinner, snacks]
		} catch (error) {
			throw new Error(error)
		}
	}

	@Mutation(() => Day)
	@UseMiddleware(isAuth)
	async addMeal(
		@Arg('addMealInput')
		{ name, food: { foodName, foodNutrition, serving }, date }: AddMealInput,
		@Ctx() { payload }: MyContext
	): Promise<Day> {
		const user = payload

		if (!user) {
			throw new AuthenticationError('User not found')
		}

		date = moment(date).format('YYYY-MM-DD')
		const newFood: Food = { foodName, foodNutrition, serving }
		const breakfast: Meal = { name: MealName.BREAKFAST, foods: [] }
		const lunch: Meal = { name: MealName.LUNCH, foods: [] }
		const dinner: Meal = { name: MealName.DINNER, foods: [] }
		const snacks: Meal = { name: MealName.SNACKS, foods: [] }

		const dayExists = await DayModel.findOne({ user, date })

		if (dayExists) {
			if (name === MealName.BREAKFAST) {
				dayExists.breakfast.foods.push(newFood)
				const breakfastNutrition = dayExists.breakfast.mealNutrition

				dayExists.breakfast.mealNutrition = {
					calorieTotal:
						breakfastNutrition?.calorieTotal! +
						newFood.foodNutrition.calories.value,
					proteinTotal:
						breakfastNutrition?.proteinTotal! +
						newFood.foodNutrition.protein.value,
					carbsTotal:
						breakfastNutrition?.carbsTotal! + newFood.foodNutrition.carbs.value,
					fatTotal:
						breakfastNutrition?.fatTotal! + newFood.foodNutrition.fat.value,
				}
			}

			if (name === MealName.LUNCH) {
				dayExists.lunch.foods.push(newFood)
				const lunchNutrition = dayExists.lunch.mealNutrition

				dayExists.lunch.mealNutrition = {
					calorieTotal:
						lunchNutrition?.calorieTotal! +
						newFood.foodNutrition.calories.value,
					proteinTotal:
						lunchNutrition?.proteinTotal! + newFood.foodNutrition.protein.value,
					carbsTotal:
						lunchNutrition?.carbsTotal! + newFood.foodNutrition.carbs.value,
					fatTotal: lunchNutrition?.fatTotal! + newFood.foodNutrition.fat.value,
				}
			}
			if (name === MealName.DINNER) {
				dayExists.dinner.foods.push(newFood)
				const dinnerNutrition = dayExists.dinner.mealNutrition

				dayExists.dinner.mealNutrition = {
					calorieTotal:
						dinnerNutrition?.calorieTotal! +
						newFood.foodNutrition.calories.value,
					proteinTotal:
						dinnerNutrition?.proteinTotal! +
						newFood.foodNutrition.protein.value,
					carbsTotal:
						dinnerNutrition?.carbsTotal! + newFood.foodNutrition.carbs.value,
					fatTotal:
						dinnerNutrition?.fatTotal! + newFood.foodNutrition.fat.value,
				}
			}
			if (name === MealName.SNACKS) {
				dayExists.snacks.foods.push(newFood)
				const snacksNutrition = dayExists.snacks.mealNutrition

				dayExists.snacks.mealNutrition = {
					calorieTotal:
						snacksNutrition?.calorieTotal! +
						newFood.foodNutrition.calories.value,
					proteinTotal:
						snacksNutrition?.proteinTotal! +
						newFood.foodNutrition.protein.value,
					carbsTotal:
						snacksNutrition?.carbsTotal! + newFood.foodNutrition.carbs.value,
					fatTotal:
						snacksNutrition?.fatTotal! + newFood.foodNutrition.fat.value,
				}
			}

			await dayExists.save()
			return dayExists
		}

		if (name === MealName.BREAKFAST) {
			breakfast.foods.push(newFood)
		}
		if (name === MealName.LUNCH) {
			lunch.foods.push(newFood)
		}
		if (name === MealName.DINNER) {
			dinner.foods.push(newFood)
		}
		if (name === MealName.SNACKS) {
			snacks.foods.push(newFood)
		}

		const newDay = new DayModel({
			date,
			breakfast,
			lunch,
			dinner,
			snacks,
			user: user._id,
		})

		if (name === MealName.BREAKFAST) {
			newDay.breakfast.mealNutrition = {
				calorieTotal: foodNutrition.calories.value,
				proteinTotal: foodNutrition.protein.value,
				carbsTotal: foodNutrition.carbs.value,
				fatTotal: foodNutrition.fat.value,
			}
		}
		if (name === MealName.LUNCH) {
			newDay.lunch.mealNutrition = {
				calorieTotal: foodNutrition.calories.value,
				proteinTotal: foodNutrition.protein.value,
				carbsTotal: foodNutrition.carbs.value,
				fatTotal: foodNutrition.fat.value,
			}
		}

		if (name === MealName.DINNER) {
			newDay.dinner.mealNutrition = {
				calorieTotal: foodNutrition.calories.value,
				proteinTotal: foodNutrition.protein.value,
				carbsTotal: foodNutrition.carbs.value,
				fatTotal: foodNutrition.fat.value,
			}
		}

		if (name === MealName.SNACKS) {
			newDay.snacks.mealNutrition = {
				calorieTotal: foodNutrition.calories.value,
				proteinTotal: foodNutrition.protein.value,
				carbsTotal: foodNutrition.carbs.value,
				fatTotal: foodNutrition.fat.value,
			}
		}

		newDay.dayNutrition.calorieTotal =
			newDay.breakfast.mealNutrition!.calorieTotal! +
			newDay.lunch.mealNutrition!.calorieTotal! +
			newDay.dinner.mealNutrition!.calorieTotal! +
			newDay.snacks.mealNutrition!.calorieTotal!

		newDay.dayNutrition.proteinTotal =
			newDay.breakfast.mealNutrition!.proteinTotal! +
			newDay.lunch.mealNutrition!.proteinTotal! +
			newDay.dinner.mealNutrition!.proteinTotal! +
			newDay.snacks.mealNutrition!.proteinTotal!

		newDay.dayNutrition.carbsTotal =
			newDay.breakfast.mealNutrition!.carbsTotal! +
			newDay.lunch.mealNutrition!.carbsTotal! +
			newDay.dinner.mealNutrition!.carbsTotal! +
			newDay.snacks.mealNutrition!.carbsTotal!

		newDay.dayNutrition.fatTotal =
			newDay.breakfast.mealNutrition!.fatTotal! +
			newDay.lunch.mealNutrition!.fatTotal! +
			newDay.dinner.mealNutrition!.fatTotal! +
			newDay.snacks.mealNutrition!.fatTotal!

		await newDay.save()
		return newDay
	}
}
