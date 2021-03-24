import { Button, Item, Label, Segment } from 'semantic-ui-react'
import { Food } from '../../types/generated/graphql'
import { capitalize } from '../../utils/helpers/capitalize'

export interface ISearchDisplayProps {
	foods: Food[]
	handleAddMeal: Function
}

export default function SearchDisplay({
	foods,
	handleAddMeal,
}: ISearchDisplayProps) {
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
						foodNutrition: { calories, carbs, fat, protein },
					} = food
					return (
						<Item key={_id}>
							<Item.Content>
								<Item.Header style={{ marginBottom: '1rem' }}>
									{capitalize(foodName.toLowerCase())}
								</Item.Header>
								<Item.Extra>
									<Label.Group color='blue'>
										{calories && calories.value >= 0 && (
											<Label>
												Calories
												<Label.Detail>{calories?.value}</Label.Detail>
											</Label>
										)}
										{protein && protein.value >= 0 && (
											<Label>
												Protein
												<Label.Detail>{protein?.value}</Label.Detail>
											</Label>
										)}
										{carbs && carbs.value >= 0 && (
											<Label>
												Carbs
												<Label.Detail>{carbs?.value}</Label.Detail>
											</Label>
										)}
										{fat && fat.value >= 0 && (
											<Label>
												Fat
												<Label.Detail>{fat?.value}</Label.Detail>
											</Label>
										)}
									</Label.Group>
								</Item.Extra>
								<Item.Extra>
									<Button
										basic
										color='blue'
										onClick={() => handleAddMeal(food)}
									>
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
