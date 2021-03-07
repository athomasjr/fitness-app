import { Message } from 'semantic-ui-react'
import { ErrorMessage } from 'formik'

export default function FormError({ name }: any) {
	return (
		<>
			<ErrorMessage
				name={name}
				render={(msg) => <Message error content={msg} />}
			/>
		</>
	)
}
