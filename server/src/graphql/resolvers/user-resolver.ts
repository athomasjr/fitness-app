import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { compare, hash } from 'bcryptjs'
import { ApolloError, UserInputError } from 'apollo-server-express'
import { generateToken } from '../../utils/generate-token'
import { LoginUserInput, RegisterUserInput } from './types/user/user-inputs'
import { UserResponse } from './types/user/user-responses'
import { User, UserModel } from '../entities/user'

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
			confirmPassword,
			dateOfBirth,
			about,
			avatar,
			dietProfile,
		}: RegisterUserInput
	): Promise<UserResponse> {
		try {
			password = await hash(password, 12)

			const newUser = new UserModel({
				username,
				email,
				password,
				confirmPassword,
				dateOfBirth,
				about,
				avatar,
				dietProfile,
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
				throw new UserInputError('Wrong credentials')
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
}
