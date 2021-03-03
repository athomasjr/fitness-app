import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql'
import { Day, DayModel } from '../entities/day'
import { isAuth } from '../../middleware/isAuth'
import { AddMealInput } from './types/day/inputs/add-meal'
import { MyContext } from '../../types'
import { AuthenticationError, UserInputError } from 'apollo-server-express'
import moment from 'moment'
import { Meal } from '../entities/meal'
import { Food } from '../entities/food'
import { MealName } from '../entities/types/meal/enums'
import { DeleteMealInput } from './types/day/inputs/delete-meal'

@Resolver(Day)
export class DayResolver {
	@Mutation(() => Day)
	@UseMiddleware(isAuth)
	async addMeal(
		@Arg('addMealInput')
		{
			name,
			food: { foodName, foodNutrition, serving },
			mealNutrition,
		}: AddMealInput,
		@Ctx() { payload }: MyContext
	): Promise<Day> {
		const user = payload

		if (!user) {
			throw new AuthenticationError('User not found')
		}

		const newFood: Food = { foodName, foodNutrition, serving }
		const newFoods: Food[] = [newFood]

		const newMeal: Meal = { name, foods: newFoods, mealNutrition }

		const date = moment().format('YYYY-MM-DD')
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
						break

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
