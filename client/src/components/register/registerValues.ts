import { Gender, RegisterUserInput } from '../../types/generated/graphql'

export const registerUserValues: RegisterUserInput = {
	username: '',
	email: '',
	password: '',
	confirmPassword: '',
	gender: Gender.Other,
	dateOfBirth: '',
}

export const genderOptions = [
	{ key: 'm', value: Gender.Male, text: 'Male' },
	{ key: 'f', value: Gender.Female, text: 'Female' },
	{ key: 'o', text: 'Other', value: Gender.Other },
]
