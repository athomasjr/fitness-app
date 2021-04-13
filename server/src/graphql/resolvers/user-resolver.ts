import { ApolloError, AuthenticationError } from 'apollo-server-express'
import { compare, hash } from 'bcryptjs'
import { config } from 'dotenv'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import moment from 'moment'
import { extname } from 'path'
import {
	Arg,
	Ctx,
	Mutation,
	Query,
	Resolver,
	UseMiddleware,
} from 'type-graphql'
import { v4 as uuid } from 'uuid'
import { s3 } from '../../AWS/s3'
import { isAuth } from '../../middleware/isAuth'
import { MyContext } from '../../types'
import { generateToken } from '../../utils/generate-token'
import { User, UserModel } from '../entities/user'
import { LoginUserInput } from './types/user/inputs/login-user'
import { RegisterUserInput } from './types/user/inputs/register-user'
import { UpdateProfileInput } from './types/user/inputs/update-profile'
import { UserResponse } from './types/user/responses/user-response'
config()

@Resolver(User)
export class UserResolver {
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
	async enterWeight(
		@Arg('currentWeight') currentWeight: number,
		@Ctx() { payload }: MyContext
	): Promise<UserResponse> {
		try {
			const user = payload

			if (!user) {
				throw new AuthenticationError('User not found')
			}

			const userProfile = await UserModel.findById(user._id)

			if (!userProfile) {
				throw new AuthenticationError('User Profile not found')
			}

			if (userProfile.goals && userProfile.goals.startingWeight === 0) {
				userProfile.goals.currentWeight = currentWeight
				userProfile.goals.startingWeight = currentWeight
			}

			if (userProfile.goals) {
				userProfile.goals.currentWeight = currentWeight
			}

			await userProfile.save()

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
	async profilePicture(
		@Arg('file', () => GraphQLUpload!) file: FileUpload,
		@Ctx() { payload }: MyContext
	): Promise<UserResponse> {
		const user = payload
		if (!user) {
			throw new AuthenticationError('User not found')
		}
		try {
			const userProfile = await UserModel.findById(user._id)
			if (!userProfile) {
				throw new AuthenticationError('User Profile not found')
			}

			const { createReadStream, filename, mimetype } = await file

			const { Location } = await s3
				.upload({
					Body: createReadStream(),
					Key: `${process.env.AWS_DIR}/${uuid()}${extname(filename)}`,
					ContentType: mimetype,
					Bucket: process.env.AWS_BUCKET_NAME!,
					ACL: 'public-read',
				})
				.promise()

			userProfile.avatar = Location

			await userProfile.save()

			return {
				user: userProfile,
				token: generateToken(user),
			}
		} catch (error) {
			throw new ApolloError(error)
		}
	}
}
