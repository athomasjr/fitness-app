import { Formik, Field } from 'formik'
import { Form, Button } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import {
	RegisterUserInput,
	useRegisterUserMutation,
} from '../../types/generated/graphql'
import { useAuthContext } from '../../context/auth/auth'
import FormError from '../form/FormError'
import { genderOptions, registerUserValues } from './registerValues'
import MySelect from '../form/MySelect'

export default function RegisterForm() {
	const context = useAuthContext()
	const [registerUser, { loading }] = useRegisterUserMutation()
	const history = useHistory()

	async function register(newUserData: RegisterUserInput, setErrors: Function) {
		try {
			await registerUser({
				update(_, { data }) {
					if (data) {
						const { registerUser: userData } = data
						context.login(userData)
						history.push('/')
					}
				},

				variables: {
					registerUserInput: newUserData,
				},
			})
		} catch (error) {
			const errors: { [key: string]: string } = {}
			error.graphQLErrors[0].extensions.exception.validationErrors.forEach(
				(validationErr: any) => {
					Object.values(validationErr.constraints).forEach((message: any) => {
						errors[validationErr.property] = message
					})
				}
			)
			setErrors(errors)
		}
	}

	return (
		<Formik
			onSubmit={(data, { setErrors }) => register(data, setErrors)}
			initialValues={registerUserValues}
		>
			{({ values, errors, touched, handleSubmit, handleChange }) => (
				<div className='form-container'>
					<Form
						error
						onSubmit={handleSubmit}
						noValidate
						className={loading ? 'loading' : ''}
					>
						<h1>Register</h1>
						<Form.Input
							label='Username'
							placeholder='Username'
							name='username'
							type='text'
							value={values.username}
							error={errors.username ? true : false}
							onChange={handleChange}
						/>
						<FormError name='username' />
						<Form.Input
							label='Email'
							placeholder='Email'
							name='email'
							type='email'
							value={values.email}
							error={errors.email ? true : false}
							onChange={handleChange}
						/>
						<FormError name='email' />
						<Form.Input
							label='Password'
							placeholder='Password'
							name='password'
							type='password'
							value={values.password}
							error={errors.password ? true : false}
							onChange={handleChange}
						/>
						<FormError name='password' />
						<Form.Input
							label='Confirm Password'
							placeholder='Confirm Password'
							name='confirmPassword'
							type='password'
							value={values.confirmPassword}
							error={errors.confirmPassword ? true : false}
							onChange={handleChange}
						/>
						<FormError name='confirmPassword' />

						<Field
							component={MySelect}
							label='Gender'
							options={genderOptions}
							name='gender'
							placeholder='Select your gender'
							value={values.gender}
						/>

						<FormError name='gender' />

						<Form.Input
							label='Date of birth'
							placeholder='CDate of birth'
							name='dateOfBirth'
							type='date'
							value={values.dateOfBirth}
							error={errors.dateOfBirth ? true : false}
							onChange={handleChange}
						/>
						<FormError name='dateOfBirth' />
						<Button type='submit' primary>
							Register
						</Button>
					</Form>
				</div>
			)}
		</Formik>
	)
}
