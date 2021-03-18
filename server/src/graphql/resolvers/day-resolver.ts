import { AuthenticationError, UserInputError } from 'apollo-server-express'
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
import { DeleteMealInput } from './types/day/inputs/delete-meal'

@Resolver(Day)
export class DayResolver {
	@Query(() => [Meal])
	@UseMiddleware(isAuth)
	async meals(
		@Arg('date') date: string,
		@Ctx() { payload }: MyContext
	): Promise<Meal[] | []> {
		try {
			const user = payload
			date = moment(date).format('YYYY-MM-DD')
			const day = await DayModel.findOne({ date, user })
			if (!day) return []

			const meals = day.meals
			return meals
		} catch (error) {
			throw new Error(error)
		}
	}

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

		const newFood: Food = { foodName, foodNutrition, serving }
		const newFoods: Food[] = [newFood]

		const newMealNutrition = newFoods.map((food) => food.foodNutrition)

		function totalProtein(arr: any[]) {
			const reducer = (sum: number, val: number) => sum + val
			const initVal = 0
			return arr.reduce(reducer, initVal)
		}

		const newMeal = {
			name,
			foods: newFoods,
		}

		date = moment(date).format('YYYY-MM-DD')
		// const formatedDate = moment(date).format('YYYY-MM-DD')
		const dayExists = await DayModel.findOne({ user, date })

		if (dayExists) {
			if (dayExists.meals) {
				const existingMeals = dayExists.meals
				switch (name) {
					case MealName.BREAKFAST:
						const breakfast = existingMeals.find(
							(meal) => meal.name === MealName.BREAKFAST
						)

						if (!breakfast) {
							existingMeals.push(newMeal)
						}
						breakfast && breakfast.foods.push(newFood)

					case MealName.LUNCH:
						const lunch = existingMeals.find(
							(meal) => meal.name === MealName.LUNCH
						)
						if (!lunch) {
							existingMeals.push(newMeal)
						}
						lunch && lunch.foods.push(newFood)
						break
					case MealName.DINNER:
						const dinner = existingMeals.find(
							(meal) => meal.name === MealName.DINNER
						)

						if (!dinner) {
							existingMeals.push(newMeal)
						}
						dinner && dinner.foods.push(newFood)
						break
					case MealName.SNACKS:
						const snacks = existingMeals.find(
							(meal) => meal.name === MealName.SNACKS
						)
						if (!snacks) {
							existingMeals.push(newMeal)
						}
						snacks && snacks.foods.push(newFood)
						break
				}
			}
			await dayExists.save()
			return dayExists
		}

		const newDay = new DayModel({
			date,
			user: user!._id,
			meals: [newMeal],
		})

		await newDay.save()

		return newDay
	}

	@Mutation(() => Day)
	@UseMiddleware(isAuth)
	async updateMeal() {}

	@Mutation(() => Day)
	@UseMiddleware(isAuth)
	async deleteMeal(
		@Arg('deleteMealInput') { name, date }: DeleteMealInput,
		@Ctx() { payload: user }: MyContext
	): Promise<Day> {
		if (!user) {
			throw new AuthenticationError('User not found')
		}

		const day = await DayModel.findOne({ user, date })

		if (!day) {
			throw new UserInputError(`Sorry, no meals logged on ${date}`)
		}

		const meals = day.meals

		const meal = meals.find((meal) => meal.name === name)

		if (!meal) {
			throw new UserInputError(`Sorry, no meal logged for ${name}`)
		}

		const index = meals.indexOf(meal)

		meals.splice(index, 1)

		await day.save()

		return day
	}
}
