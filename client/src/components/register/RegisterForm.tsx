import { subYears } from 'date-fns'
import { Field, Formik } from 'formik'
import { useHistory } from 'react-router-dom'
import { Button, Form } from 'semantic-ui-react'
import { useAuthContext } from '../../context/auth/auth'
import {
	RegisterUserInput,
	useRegisterUserMutation,
} from '../../types/generated/graphql'
import { registerValidation } from '../../validation'
import FormError from '../form/FormError'
import MyDatePicker from '../form/MyDatePicker'
import MySelect from '../form/MySelect'
import { genderOptions, registerUserValues } from './registerValues'

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
			validationSchema={registerValidation}
			initialValues={registerUserValues}
		>
			{({
				values,
				errors,
				touched,
				handleSubmit,
				handleChange,
				setFieldValue,
			}) => (
				<div className='form-container'>
					<Form
						error
						onSubmit={handleSubmit}
						noValidate
						className={loading ? 'loading' : ''}
					>
						<h1>Register</h1>
						<Form.Input
							icon='user'
							iconPosition='left'
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
							icon='mail'
							iconPosition='left'
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
							icon='lock'
							iconPosition='left'
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
							icon='lock'
							iconPosition='left'
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

						<MyDatePicker
							placeholderText='Select your date of birth'
							label='Date of birth'
							value={values.dateOfBirth}
							name='dateOfBirth'
							maxDate={subYears(new Date(), 18)}
							error={errors.dateOfBirth ? true : false}
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
