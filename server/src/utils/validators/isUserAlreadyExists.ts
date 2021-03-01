import {
	registerDecorator,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from 'class-validator'
import { UserModel } from '../../graphql/entities/user'

@ValidatorConstraint({ async: true })
export class IsUserAlreadyExistsConstraint
	implements ValidatorConstraintInterface {
	validate(username: string) {
		return UserModel.findOne({ username }).then((user) => {
			if (user) return false
			return true
		})
	}
}

export function IsUserAlreadyExists(validationOptions?: ValidationOptions) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [],
			validator: IsUserAlreadyExistsConstraint,
		})
	}
}
