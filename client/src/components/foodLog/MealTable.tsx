import { Link } from 'react-router-dom'
import { Button, Label, Table } from 'semantic-ui-react'
import { Meal, MealName } from '../../types/generated/graphql'
import { capitalize } from '../../utils/helpers/capitalize'

export interface IMealTableProps {
	meal: Meal
	mealType: MealName
	date: any
}

export default function MealTable({ meal, mealType, date }: IMealTableProps) {
	return (
		<div style={{ marginTop: '4rem' }}>
			<Label color='blue' size='big'>
				{capitalize(mealType.toLowerCase())}
			</Label>
			<Table compact celled>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Food</Table.HeaderCell>
						<Table.HeaderCell>Calories</Table.HeaderCell>
						<Table.HeaderCell>Protein</Table.HeaderCell>
						<Table.HeaderCell>Carbs</Table.HeaderCell>
						<Table.HeaderCell>Fat</Table.HeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{meal === undefined ? (
						<Table.Row></Table.Row>
					) : meal.foods.length > 0 ? (
						meal.foods.map((food: any) => {
							const {
								_id,
								foodName,
								foodNutrition: { calories, protein, carbs, fat },
								serving,
							} = food
							return (
								<Table.Row key={_id}>
									<Table.Cell>{capitalize(foodName.toLowerCase())}</Table.Cell>
									<Table.Cell>{calories?.value}</Table.Cell>
									<Table.Cell>{protein?.value}</Table.Cell>
									<Table.Cell>{carbs?.value}</Table.Cell>
									<Table.Cell>{fat?.value}</Table.Cell>
								</Table.Row>
							)
						})
					) : (
						<Table.Row></Table.Row>
					)}
				</Table.Body>

				<Table.Footer fullWidth>
					<Table.Row>
						<Table.HeaderCell>
							<Button
								as={Link}
								to={`/food/add_food/${mealType}/${date}`}
								floated='left'
								icon
								basic
								color='blue'
								size='small'
							>
								Add food
							</Button>
						</Table.HeaderCell>
						{meal === undefined ? (
							<>
								<Table.HeaderCell>0</Table.HeaderCell>
								<Table.HeaderCell>0</Table.HeaderCell>
								<Table.HeaderCell>0</Table.HeaderCell>
								<Table.HeaderCell>0</Table.HeaderCell>
							</>
						) : (
							<>
								<Table.HeaderCell>
									{meal.mealNutrition?.calorieTotal.toFixed(1)}
								</Table.HeaderCell>
								<Table.HeaderCell>
									{meal.mealNutrition?.proteinTotal.toFixed(1)}
								</Table.HeaderCell>
								<Table.HeaderCell>
									{meal.mealNutrition?.carbsTotal.toFixed(1)}
								</Table.HeaderCell>
								<Table.HeaderCell>
									{meal.mealNutrition?.fatTotal.toFixed(1)}
								</Table.HeaderCell>
							</>
						)}
					</Table.Row>
				</Table.Footer>
			</Table>
		</div>
	)
}
