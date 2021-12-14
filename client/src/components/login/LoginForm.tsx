import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react';
import { useAuthContext } from '../../context/auth/auth';
import {
	LoginUserInput,
	useLoginUserMutation,
} from '../../types/generated/graphql';
import { loginValidation } from '../../validation';
import FormError from '../form/FormError';

export interface ILoginFormProps {
	heading?: string;
}

export default function LoginForm({ heading }: ILoginFormProps) {
	const context = useAuthContext();
	const [loginUser, { loading }] = useLoginUserMutation();
	const history = useHistory();

	async function login(loginValues: LoginUserInput, setErrors: Function) {
		try {
			await loginUser({
				update(_, { data }) {
					if (data) {
						const { loginUser: userData } = data;
						context.login(userData);
						history.push('/');
					}
				},
				variables: {
					loginUserInput: loginValues,
				},
			});
		} catch (error: any) {
			const errors: { [key: string]: string } = {};
			error.graphQLErrors[0].extensions.exception.validationErrors.forEach(
				(validationErr: any) => {
					Object.values(validationErr.constraints).forEach((message: any) => {
						errors[validationErr.property] = message;
					});
				}
			);
			setErrors(errors);
		}
	}

	return (
		<Formik<LoginUserInput>
			initialValues={{
				username: '',
				password: '',
			}}
			validationSchema={loginValidation}
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
						{heading ? <h1>{heading}</h1> : null}

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
						<Button type='submit' primary>
							Login
						</Button>
					</Form>
				</div>
			)}
		</Formik>
	);
}
