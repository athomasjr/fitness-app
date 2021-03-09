import { registerEnumType } from 'type-graphql'

export enum Gender {
	MALE = 'male',
	FEMALE = 'female',
	OTHER = 'other',
}

registerEnumType(Gender, {
	name: 'Gender',
})
