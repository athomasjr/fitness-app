import { Formik } from 'formik'
import { Form, Button } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import { useAuthContext } from '../../context/auth'
import {
	UpdateProfileInput,
	useUpdateProfileMutation,
} from '../../types/generated/graphql'
import FormError from '../form/FormError'

export default function UpdateProfileForm() {
	const { user, login } = useAuthContext()
	const history = useHistory()
	const [updateProfile, { loading }] = useUpdateProfileMutation()

	const iValue0 =
		user && user.user.inspirations ? user.user.inspirations[0] : ''
	const iValue1 =
		user && user.user.inspirations ? user.user.inspirations[1] : ''
	const iValue2 =
		user && user.user.inspirations ? user.user.inspirations[2] : ''
	const aboutValue = user && user.user.about ? user.user.about : ''
	const whyValue = user && user.user.why ? user.user.why : ''

	async function update(data: UpdateProfileInput, setErrors: Function) {
		try {
			await updateProfile({
				update(_, { data }) {
					if (data) {
						const { updateProfile: userData } = data
						login(userData)
						history.push('/profile')
					}
				},
				variables: {
					updateProfileInput: data,
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
		<Formik<UpdateProfileInput>
			onSubmit={(data, { setErrors }) => update(data, setErrors)}
			initialValues={{
				about: aboutValue,
				why: whyValue,
				inspiration0: iValue0,
				inspiration1: iValue1,
				inspiration2: iValue2,
			}}
		>
			{({ values, errors, handleChange, handleSubmit }) => (
				<div className='form-container'>
					<Form
						onSubmit={handleSubmit}
						error
						noValidate
						className={loading ? 'loading' : ''}
					>
						<Form.TextArea
							name='about'
							label='About Me'
							value={values.about!}
							error={errors.about ? true : false}
							onChange={handleChange}
						/>
						<FormError name='about' />

						<Form.TextArea
							name='why'
							label='Why I want to get in shape'
							value={values.why!}
							error={errors.why ? true : false}
							onChange={handleChange}
						/>
						<FormError name='why' />

						<Form.Input
							name='inspiration0'
							label='What inspires you'
							value={values.inspiration0}
							error={errors.inspiration0 ? true : false}
							onChange={handleChange}
						/>
						<FormError name='inspiration0' />

						<Form.Input
							name='inspiration1'
							value={values.inspiration1}
							error={errors.inspiration1 ? true : false}
							onChange={handleChange}
						/>
						<FormError name='inspiration1' />

						<Form.Input
							name='inspiration2'
							value={values.inspiration2}
							error={errors.inspiration2 ? true : false}
							onChange={handleChange}
						/>

						<FormError name='inspiration2' />

						<Button type='submit' primary>
							Update
						</Button>
					</Form>
				</div>
			)}
		</Formik>
	)
}
