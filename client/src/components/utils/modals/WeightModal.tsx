import { useFormik } from 'formik'
import { Button, Form, Modal } from 'semantic-ui-react'
import { useAuthContext } from '../../../context/auth/auth'
import { useEnterWeightMutation } from '../../../types/generated/graphql'

export interface IWeightModalProps {
	open: boolean
	onClose: any
}

export default function WeightModal({ open, onClose }: IWeightModalProps) {
	const { user, updateUser } = useAuthContext()
	const [enterWeight, { loading }] = useEnterWeightMutation()

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: { currentWeight: '' },
		onSubmit: (values, { resetForm }) => {
			handleEnterWeight(values.currentWeight)
			onClose()
			resetForm()
		},
	})

	async function handleEnterWeight(value: any) {
		try {
			await enterWeight({
				variables: {
					currentWeight: parseFloat(value),
				},
				update(_, { data }) {
					if (data) {
						const { enterWeight: userData } = data
						updateUser(userData)
					}
				},
			})
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<Modal size='mini' open={open} onClose={onClose}>
			<Modal.Header>Enter today's weight:</Modal.Header>
			<Modal.Content>
				<Form
					className={loading ? 'loading' : ''}
					onSubmit={formik.handleSubmit}
				>
					<Form.Input
						placeholder="Today's weight"
						{...formik.getFieldProps('currentWeight')}
					/>
					<Button.Group>
						<Button onClick={onClose}>Cancel</Button>
						<Button.Or />
						<Button positive type='submit'>
							Save
						</Button>
					</Button.Group>
				</Form>
			</Modal.Content>
		</Modal>
	)
}
