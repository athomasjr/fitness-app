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
import { TotalNutrition } from '../entities/total-nutrition'
import { MealName } from '../entities/types/meal/enums'
import { AddMealInput } from './types/day/inputs/add-meal'
import { DeleteFoodInput } from './types/day/inputs/delete-food'

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

	@Query(() => TotalNutrition)
	@UseMiddleware(isAuth)
	async dayTotals(
		@Arg('date') date: string,
		@Arg('userId') userId: string
	): Promise<TotalNutrition> {
		date = moment(date).format('YYYY-MM-DD')

		try {
			const day = await DayModel.findOne({ date, user: userId })
			if (!day) {
				throw new AuthenticationError('Day not found')
			}

			return day.dayNutrition
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

	@Mutation(() => [Meal])
	@UseMiddleware(isAuth)
	async deleteFood(
		@Arg('deleteFoodInput') { date, foodIdx, name, userId }: DeleteFoodInput
	): Promise<Meal[]> {
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

			if (name === MealName.BREAKFAST) {
				const deletedBreakfastFoodNutrition =
					breakfast.foods[foodIdx].foodNutrition

				breakfast.mealNutrition!.calorieTotal =
					breakfast.mealNutrition!.calorieTotal! -
					deletedBreakfastFoodNutrition.calories.value

				breakfast.mealNutrition!.proteinTotal =
					breakfast.mealNutrition!.proteinTotal! -
					deletedBreakfastFoodNutrition.protein.value

				breakfast.mealNutrition!.carbsTotal =
					breakfast.mealNutrition!.carbsTotal! -
					deletedBreakfastFoodNutrition.carbs.value

				breakfast.mealNutrition!.fatTotal =
					breakfast.mealNutrition!.fatTotal! -
					deletedBreakfastFoodNutrition.fat.value

				day.dayNutrition.calorieTotal =
					day.dayNutrition.calorieTotal! -
					deletedBreakfastFoodNutrition.calories.value

				day.dayNutrition.proteinTotal =
					day.dayNutrition.proteinTotal! -
					deletedBreakfastFoodNutrition.protein.value

				day.dayNutrition.carbsTotal =
					day.dayNutrition.carbsTotal! -
					deletedBreakfastFoodNutrition.carbs.value

				day.dayNutrition.fatTotal =
					day.dayNutrition.fatTotal! - deletedBreakfastFoodNutrition.fat.value

				breakfast.foods.splice(foodIdx, 1)
			}
			if (name === MealName.LUNCH) {
				const deletedLunchFoodNutrition = lunch.foods[foodIdx].foodNutrition

				lunch.mealNutrition!.calorieTotal =
					lunch.mealNutrition!.calorieTotal! -
					deletedLunchFoodNutrition.calories.value

				lunch.mealNutrition!.proteinTotal =
					lunch.mealNutrition!.proteinTotal! -
					deletedLunchFoodNutrition.protein.value

				lunch.mealNutrition!.carbsTotal =
					lunch.mealNutrition!.carbsTotal! -
					deletedLunchFoodNutrition.carbs.value

				lunch.mealNutrition!.fatTotal =
					lunch.mealNutrition!.fatTotal! - deletedLunchFoodNutrition.fat.value

				day.dayNutrition.calorieTotal =
					day.dayNutrition.calorieTotal! -
					deletedLunchFoodNutrition.calories.value

				day.dayNutrition.proteinTotal =
					day.dayNutrition.proteinTotal! -
					deletedLunchFoodNutrition.protein.value

				day.dayNutrition.carbsTotal =
					day.dayNutrition.carbsTotal! - deletedLunchFoodNutrition.carbs.value

				day.dayNutrition.fatTotal =
					day.dayNutrition.fatTotal! - deletedLunchFoodNutrition.fat.value

				lunch.foods.splice(foodIdx, 1)
			}
			if (name === MealName.DINNER) {
				const deletedDinnerFoodNutrition = dinner.foods[foodIdx].foodNutrition

				dinner.mealNutrition!.calorieTotal =
					dinner.mealNutrition!.calorieTotal! -
					deletedDinnerFoodNutrition.calories.value

				dinner.mealNutrition!.proteinTotal =
					dinner.mealNutrition!.proteinTotal! -
					deletedDinnerFoodNutrition.protein.value

				dinner.mealNutrition!.carbsTotal =
					dinner.mealNutrition!.carbsTotal! -
					deletedDinnerFoodNutrition.carbs.value

				dinner.mealNutrition!.fatTotal =
					dinner.mealNutrition!.fatTotal! - deletedDinnerFoodNutrition.fat.value

				day.dayNutrition.calorieTotal =
					day.dayNutrition.calorieTotal! -
					deletedDinnerFoodNutrition.calories.value

				day.dayNutrition.proteinTotal =
					day.dayNutrition.proteinTotal! -
					deletedDinnerFoodNutrition.protein.value

				day.dayNutrition.carbsTotal =
					day.dayNutrition.carbsTotal! - deletedDinnerFoodNutrition.carbs.value

				day.dayNutrition.fatTotal =
					day.dayNutrition.fatTotal! - deletedDinnerFoodNutrition.fat.value

				dinner.foods.splice(foodIdx, 1)
			}
			if (name === MealName.SNACKS) {
				const deletedSnacksFoodNutrition = snacks.foods[foodIdx].foodNutrition

				snacks.mealNutrition!.calorieTotal =
					snacks.mealNutrition!.calorieTotal! -
					deletedSnacksFoodNutrition.calories.value

				snacks.mealNutrition!.proteinTotal =
					snacks.mealNutrition!.proteinTotal! -
					deletedSnacksFoodNutrition.protein.value

				snacks.mealNutrition!.carbsTotal =
					snacks.mealNutrition!.carbsTotal! -
					deletedSnacksFoodNutrition.carbs.value

				snacks.mealNutrition!.fatTotal =
					snacks.mealNutrition!.fatTotal! - deletedSnacksFoodNutrition.fat.value

				day.dayNutrition.calorieTotal =
					day.dayNutrition.calorieTotal! -
					deletedSnacksFoodNutrition.calories.value

				day.dayNutrition.proteinTotal =
					day.dayNutrition.proteinTotal! -
					deletedSnacksFoodNutrition.protein.value

				day.dayNutrition.carbsTotal =
					day.dayNutrition.carbsTotal! - deletedSnacksFoodNutrition.carbs.value

				day.dayNutrition.fatTotal =
					day.dayNutrition.fatTotal! - deletedSnacksFoodNutrition.fat.value

				snacks.foods.splice(foodIdx, 1)
			}

			await day.save()

			return [breakfast, lunch, dinner, snacks]
		} catch (error) {
			throw new Error(error)
		}
	}
}
