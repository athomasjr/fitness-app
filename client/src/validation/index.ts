import * as Yup from 'yup'

export const profilePictureValidation = Yup.object().shape({
	file: Yup.mixed()
		.required('You must provide an image')
		.test('imageSize', 'The image is too large', (value: any) => {
			return value && value.size <= 200000
		}),
})

export const loginValidation = Yup.object().shape({
	username: Yup.string().required('Username is required'),
	password: Yup.string().required('Password is required'),
})

export const registerValidation = Yup.object().shape({
	username: Yup.string()
		.required('Username is required')
		.min(5, 'Username must be at least 5 characters')
		.max(10, 'Username can be no more than 10 characters'),
	email: Yup.string().email('invalid email').required('Email is required'),
	password: Yup.string()
		.required()
		.matches(
			/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
			'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
		),
	confirmPassword: Yup.string().oneOf(
		[Yup.ref('password')],
		'Passwords must match'
	),
	gender: Yup.string().required('Gender is required'),
	dateOfBirth: Yup.date().required('Date of birth is required'),
})

export const updateProfileValidation = Yup.object().shape({
	about: Yup.string().max(
		180,
		'About section must be no more than 180 characters'
	),
	why: Yup.string().max(180, 'Why section must be no more than 180 characters'),
	inspiration0: Yup.string().max(
		20,
		'Inspirations must be no more than 20 characters'
	),
	inspiration1: Yup.string().max(
		20,
		'Inspirations must be no more than 20 characters'
	),
	inspiration2: Yup.string().max(
		20,
		'Inspirations must be no more than 20 characters'
	),
})

export const weightValidation = Yup.object().shape({
	currentWeight: Yup.number().max(
		500,
		'Weight must be less than or equal to 500lbs'
	),
})
