import { registerEnumType } from 'type-graphql'

export enum Gender {
	MALE = 'male',
	FEMALE = 'female',
}

registerEnumType(Gender, {
	name: 'Gender',
})
