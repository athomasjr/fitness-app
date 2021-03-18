import { useParams } from 'react-router-dom'
import { Button, Item, Label, Segment } from 'semantic-ui-react'
import {
	Food,
	MealName,
	useAddMealMutation,
} from '../../types/generated/graphql'
import { capitalize } from '../../utils/helpers/capitalize'

interface ISearchDisplayProps {
	foods: Food[]
}

export default function SearchDisplay({ foods }: ISearchDisplayProps) {
	const params: MealName = useParams()

	const [addMeal, { loading }] = useAddMealMutation()

	async function handleAddMeal(food: Food) {
		try {
			await addMeal({
				variables: {
					addMealInput: { food: food, date: '20210313', name: params },
				},
			})
		} catch (error) {}
	}

	return (
		<Segment
			style={{ marginRight: 'auto', marginLeft: 'auto', marginTop: '5rem' }}
			compact
		>
			<Item.Group divided>
				{foods.map((food) => {
					const {
						_id,
						foodName,
						foodNutrition: {
							calories,
							carbs,
							fat,
							protein,
							fiber,
							sodium,
							sugar,
						},
						serving,
					} = food
					return (
						<Item key={_id}>
							<Item.Content>
								<Item.Header style={{ marginBottom: '1rem' }}>
									{capitalize(foodName.toLowerCase())}
								</Item.Header>
								<Item.Extra>
									<Label.Group color='blue'>
										{calories && calories.value && (
											<Label>
												Calories
												<Label.Detail>{calories?.value}</Label.Detail>
											</Label>
										)}
										{protein && protein.value && (
											<Label>
												Protein
												<Label.Detail>{protein?.value}</Label.Detail>
											</Label>
										)}
										{carbs && carbs.value && (
											<Label>
												Carbs
												<Label.Detail>{carbs?.value}</Label.Detail>
											</Label>
										)}
										{fat && fat.value && (
											<Label>
												Fat
												<Label.Detail>{fat?.value}</Label.Detail>
											</Label>
										)}
									</Label.Group>
								</Item.Extra>
								<Item.Extra>
									<Button basic color='blue' onClick={() => console.log(food)}>
										Add
									</Button>
								</Item.Extra>
							</Item.Content>
						</Item>
					)
				})}
			</Item.Group>
		</Segment>
	)
}
