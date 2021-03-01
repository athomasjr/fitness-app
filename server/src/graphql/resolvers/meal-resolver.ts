import { Arg, Mutation, Resolver, UseMiddleware } from 'type-graphql'
import { Meal } from '../entities/meals'
import { Day } from '../entities/day'
import { isAuth } from '../../middleware/isAuth'
import { CreateMealInput } from './types/meal/meal-inputs'
import axios from 'Axios'

// const uri =
// 	'https://api.nal.usda.gov/fdc/v1/foods/search?api_key=xVtzAQZafgnCbtcAqCB7rS4rilyrQCIaR4io2skv&query=Cheddar%20Cheese'

@Resolver(Meal)
export class MealResolver {
	@Mutation(() => Day)
	@UseMiddleware(isAuth)
	async createMeal(@Arg('mealInput') { type, foods }: CreateMealInput) {
		console.log(type)
		console.log(foods)
	}
}
