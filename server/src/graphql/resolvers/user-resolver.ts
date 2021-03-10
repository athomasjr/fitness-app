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
import { UpdateProfileInput } from './types/user/inputs/update-profile'

@Resolver(User)
export class UserResolver {
	@Query(() => String)
	hello() {
		return 'hi!'
	}

	@Query(() => User)
	@UseMiddleware(isAuth)
	async user(@Ctx() { payload }: MyContext): Promise<User> {
		try {
			const user = payload

			if (!user) {
				throw new AuthenticationError('User not found ')
			}
			const userProfile = await UserModel.findById(user._id)

			if (!userProfile) {
				throw new AuthenticationError('User not found ')
			}

			return userProfile
		} catch (error) {
			throw new ApolloError(error)
		}
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

	@Mutation(() => UserResponse)
	@UseMiddleware(isAuth)
	async updateProfile(
		@Arg('updateProfileInput')
		{
			about,
			inspiration0,
			inspiration1,
			inspiration2,
			why,
		}: UpdateProfileInput,
		@Ctx() { payload }: MyContext
	): Promise<UserResponse> {
		try {
			const user = payload

			if (!user) {
				throw new AuthenticationError('User not found')
			}

			const userProfile = await UserModel.findById(user._id)

			if (userProfile) {
				if (about) {
					userProfile.about = about
				}
				if (why) {
					userProfile.why = why
				}

				if (userProfile.inspirations) {
					if (inspiration0) {
						userProfile.inspirations[0] = inspiration0
					}

					if (inspiration1) {
						userProfile.inspirations[1] = inspiration1
					}

					if (inspiration2) {
						userProfile.inspirations[2] = inspiration2
					}
				}

				// if (!userProfile.inspirations) {
				// 	userProfile.inspirations = newInspirations
				// }

				// if (userProfile.inspirations && newInspirations) {
				// 	newInspirations.map((i) => userProfile.inspirations?.push(i))
				// 	// userProfile.inspirations.push(inspirations)
				// }
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
