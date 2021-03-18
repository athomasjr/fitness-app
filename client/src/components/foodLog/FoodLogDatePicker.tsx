import DatePicker from 'react-datepicker'
import { forwardRef, useState } from 'react'
import { Button, Icon, Label } from 'semantic-ui-react'
import { addDays, subDays } from 'date-fns'
import 'react-datepicker/dist/react-datepicker.css'

export default function FoodLogDatePicker() {
	const [startDate, setStartDate] = useState(new Date())

	const ExampleCustomInput = forwardRef(({ value, onClick }: any, ref) => (
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
			customInput={<ExampleCustomInput />}
		/>
	)
}
