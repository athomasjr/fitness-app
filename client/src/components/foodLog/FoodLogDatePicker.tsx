import { addDays, subDays } from 'date-fns'
import { forwardRef, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Button, Icon, Label } from 'semantic-ui-react'

export default function FoodLogDatePicker() {
	const [startDate, setStartDate] = useState<Date>(new Date())

	const CustomInput = forwardRef(({ value, onClick }: any, ref) => (
		<>
			<Button
				onClick={() => setStartDate(subDays(startDate, 1))}
				size='tiny'
				color='blue'
			>
				<Icon name='angle left' />
			</Button>
			<Label
				size='large'
				className='ui blue'
				onClick={onClick}
				ref={ref as any}
			>
				{value}
			</Label>

			<Button
				onClick={() => setStartDate(addDays(startDate, 1))}
				size='tiny'
				color='blue'
			>
				<Icon name='angle right' />
			</Button>
		</>
	))
	return (
		<DatePicker
			disabled
			selected={startDate}
			onChange={(date) => setStartDate(date as any)}
			customInput={<CustomInput />}
		/>
	)
}
