import { Form } from 'semantic-ui-react'

export default function MySelect({
	field: { name, value },
	form: { setFieldValue },
	options,
	children: _,
	...props
}: any) {
	return (
		<Form.Select
			selection
			options={options}
			value={value}
			onChange={(_, { value }) => setFieldValue(name, value)}
			{...props}
		/>
	)
}
