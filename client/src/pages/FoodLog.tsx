import { addDays, subDays } from 'date-fns'
import moment from 'moment'
import { forwardRef, useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import { Button, Icon, Label, Loader } from 'semantic-ui-react'
import MealTable from '../components/foodLog/MealTable'
import { useAuthContext } from '../context/auth/auth'
import { LocalStorage } from '../types/authContext'
import { MealName, useMealsQuery } from '../types/generated/graphql'

export default function FoodLog() {
	useEffect(() => {
		localStorage.setItem(
			LocalStorage.DATE,
			JSON.stringify(moment().format('YYYY-MM-DD'))
		)
	}, [])

	const storedDate = localStorage.getItem(LocalStorage.DATE)

	const start = storedDate ? moment(storedDate).toDate() : new Date()

	const [startDate, setStartDate] = useState<Date>(start)

	const date = moment(startDate).format('YYYY-MM-DD')

	function subDate() {
		setStartDate(subDays(startDate, 1))
	}

	function addDate() {
		setStartDate(addDays(startDate, 1))
	}

	useEffect(() => {
		localStorage.setItem(
			LocalStorage.DATE,
			moment(startDate).format('YYYY-MM-DD')
		)
	}, [startDate])

	const CustomInput = forwardRef(({ value, onClick }: any, ref) => (
		<div style={{ display: 'flex', alignItems: 'stretch' }}>
			<Button attached='left' onClick={subDate} size='medium' color='blue'>
				<Icon name='angle left' />
			</Button>
			<Label
				style={{ borderRadius: '0' }}
				size='big'
				className='ui blue'
				onClick={onClick}
				ref={ref as any}
			>
				{value}
			</Label>

			<Button attached='right' onClick={addDate} size='medium' color='blue'>
				<Icon name='angle right' />
			</Button>
		</div>
	))

	const { user } = useAuthContext()

	const { data, loading } = useMealsQuery({
		variables: {
			userId: user?.user._id!,
			date,
		},
	})

	const breakfast =
		data === undefined
			? undefined
			: data.meals.filter((meal) => meal.name === MealName.Breakfast)[0]

	const lunch =
		data === undefined
			? undefined
			: data.meals.filter((meal) => meal.name === MealName.Lunch)[0]

	const dinner =
		data === undefined
			? undefined
			: data.meals.filter((meal) => meal.name === MealName.Dinner)[0]

	const snacks =
		data === undefined
			? undefined
			: data.meals.filter((meal) => meal.name === MealName.Snacks)[0]

	return loading ? (
		<Loader active inline='centered' />
	) : (
		<>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<div>
					<h3 style={{ width: '100%', marginRight: '1rem', fontSize: '2rem' }}>
						Your food log for:
					</h3>
				</div>

				<div>
					<DatePicker
						// disabled
						selected={startDate}
						onChange={(date) => setStartDate(date as any)}
						customInput={<CustomInput />}
						todayButton='today'
					/>
				</div>
			</div>

			<MealTable
				meal={breakfast as any}
				mealType={MealName.Breakfast}
				date={date}
			/>
			<MealTable meal={lunch as any} mealType={MealName.Lunch} date={date} />
			<MealTable meal={dinner as any} mealType={MealName.Dinner} date={date} />
			<MealTable meal={snacks as any} mealType={MealName.Snacks} date={date} />
		</>
	)
}
