import { useHistory } from 'react-router-dom'
import { Formik } from 'formik'
import { Form, Button } from 'semantic-ui-react'
import {
	LoginUserInput,
	useLoginUserMutation,
} from '../../types/generated/graphql'
import { useAuthContext } from '../../context/auth'
import FormError from '../form/FormError'

export default function LoginForm() {
	const context = useAuthContext()
	const [loginUser, { loading }] = useLoginUserMutation()
	const history = useHistory()

	async function login(loginValues: LoginUserInput, setErrors: Function) {
		try {
			await loginUser({
				update(_, { data }) {
					if (data) {
						const { loginUser: userData } = data
						context.login(userData)
						history.push('/')
					}
				},
				variables: {
					loginUserInput: loginValues,
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
		<Formik<LoginUserInput>
			initialValues={{
				username: 'antonio',
				password: '123456',
			}}
			onSubmit={(loginValues, { setErrors }) => login(loginValues, setErrors)}
		>
			{({ values, handleSubmit, handleChange, errors }) => (
				<div className='form-container'>
					<Form
						error
						noValidate
						className={loading ? 'loading' : ''}
						onSubmit={handleSubmit}
					>
						<h1>Login</h1>
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
							label='Password'
							placeholder='Password'
							name='password'
							type='password'
							value={values.password}
							error={errors.password ? true : false}
							onChange={handleChange}
						/>
						<FormError name='password' />
						<Button type='submit' primary>
							Login
						</Button>
					</Form>
				</div>
			)}
		</Formik>
	)
}
