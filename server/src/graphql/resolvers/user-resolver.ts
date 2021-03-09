import {
	Arg,
	Ctx,
	Mutation,
	Query,
	Resolver,
	UseMiddleware,
} from 'type-graphql'
import { compare, hash } from 'bcryptjs'
import { ApolloError, AuthenticationError } from 'apollo-server-express'
import { generateToken } from '../../utils/generate-token'
import { LoginUserInput } from './types/user/inputs/login-user'
import { UserResponse } from './types/user/responses/user-response'
import { User, UserModel } from '../entities/user'
import { RegisterUserInput } from './types/user/inputs/register-user'
import { UserGoalsInput } from './types/user/inputs/update-goals'
import { MyContext } from '../../types'
import { isAuth } from '../../middleware/isAuth'
import moment from 'moment'

@Resolver(User)
export class UserResolver {
	@Query(() => String)
	hello() {
		return 'hi!'
	}

	@Mutation(() => UserResponse)
	async registerUser(
		@Arg('registerUserInput')
		{
			username,
			email,
			password,
			dateOfBirth,
			confirmPassword,
			gender,
		}: RegisterUserInput
	): Promise<UserResponse> {
		try {
			password = await hash(password, 12)

			dateOfBirth = moment(dateOfBirth).format('YYYY-MM-DD')

			const newUser = new UserModel({
				username,
				email,
				password,
				confirmPassword,
				dateOfBirth,
				gender,
				// goals: {
				// 	currentWeight,
				// 	goalWeight,
				// 	startingWeight,
				// },
			})

			await newUser.save()

			const token = generateToken(newUser)

			return {
				user: newUser,
				token,
			}
		} catch (error) {
			throw new ApolloError(error)
		}
	}

	@Mutation(() => UserResponse)
	async loginUser(
		@Arg('loginUserInput') { username, password }: LoginUserInput
	): Promise<UserResponse> {
		try {
			const user = await UserModel.findOne({ username })

			const match = await compare(password, user!.password)

			if (!match) {
				throw new AuthenticationError('Wrong credentials')
			}

			const token = generateToken(user!)

			return {
				user: user!,
				token,
			}
		} catch (error) {
			throw new ApolloError(error)
		}
	}

	@Mutation(() => UserResponse)
	@UseMiddleware(isAuth)
	async updateUserGoals(
		@Arg('userGoalInput')
		{ currentWeight, goalWeight, startingWeight }: UserGoalsInput,
		@Ctx() { payload }: MyContext
	): Promise<UserResponse> {
		try {
			const user = payload

			if (!user) {
				throw new AuthenticationError('User not found ')
			}
			const userProfile = await UserModel.findById(user._id)
			if (userProfile) {
				userProfile.goals = { currentWeight, startingWeight, goalWeight }
				await userProfile.save()
			}

			const token = generateToken(user)
			return {
				user: userProfile!,
				token,
			}
		} catch (error) {
			throw new ApolloError(error)
		}
	}
}
