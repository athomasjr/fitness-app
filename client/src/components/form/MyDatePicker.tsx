import { Field, FieldProps } from 'formik'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default function MyDatePicker({ label, name, error, ...rest }: any) {
	return (
		<div className={`field ${error === true ? 'error' : ''} `}>
			<label htmlFor={name}>{label}</label>

			<Field name={name}>
				{({ form, field }: FieldProps) => {
					const { setFieldValue } = form
					const { value } = field
					return (
						<DatePicker
							// dateFormat='MMMM d, yyyy h:mm aa'
							id={name}
							{...field}
							{...rest}
							selected={value}
							onChange={(value) => setFieldValue(name, value)}
						/>
					)
				}}
			</Field>
		</div>
	)
}
