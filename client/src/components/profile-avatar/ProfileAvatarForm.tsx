import { Formik } from 'formik'
import { useHistory } from 'react-router-dom'
import { Button, Form, Header, Icon } from 'semantic-ui-react'
import { useAuthContext } from '../../context/auth/auth'
import {
	ProfilePictureMutationVariables,
	useProfilePictureMutation,
} from '../../types/generated/graphql'
import { profilePictureValidation } from '../../validation'
import FormError from '../form/FormError'

export default function ProfileAvatarForm() {
	const { updateUser } = useAuthContext()
	const [uploadPicture, { loading }] = useProfilePictureMutation()
	const history = useHistory()

	async function upload(
		values: ProfilePictureMutationVariables,
		setErrors: Function
	) {
		try {
			await uploadPicture({
				update(_, { data }) {
					if (data) {
						const { profilePicture: userData } = data
						updateUser(userData)
						history.push('/profile')
					}
				},
				variables: { file: values },
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
		<Formik<ProfilePictureMutationVariables>
			initialValues={{ file: null }}
			validationSchema={profilePictureValidation}
			onSubmit={async (values, { setErrors }) => upload(values.file, setErrors)}
		>
			{({ handleSubmit, errors, setFieldValue }) => (
				<div className='form-container'>
					<Form
						error
						noValidate
						className={loading ? 'loading' : ''}
						onSubmit={handleSubmit}
					>
						<Header as='h1' icon>
							<Icon name='picture' color='blue' />
							Upload a new profile pictures
						</Header>
						<Form.Input
							type='file'
							name='file'
							accept='image/*'
							error={errors.file ? true : false}
							onChange={({
								target: {
									files: [file],
								},
							}: any) => setFieldValue('file', file)}
						/>
						<FormError name='file' />

						<Button positive type='submit'>
							Upload
						</Button>
					</Form>
				</div>
			)}
		</Formik>
	)
}
