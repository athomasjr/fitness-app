import { Table, Label, Button } from 'semantic-ui-react'
import { Food, MealName } from '../../types/generated/graphql'
import { capitalize } from '../../utils/helpers/capitalize'
import { Link } from 'react-router-dom'

export interface IMealTableProps {
	meal: Food[]
	mealType: MealName
}

export default function MealTable({ meal, mealType }: IMealTableProps) {
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
						<Table.HeaderCell>Fiber</Table.HeaderCell>
						<Table.HeaderCell>Sugar</Table.HeaderCell>
						<Table.HeaderCell>Sodium</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{meal.length > 0 ? (
						meal.map((food) => {
							const {
								_id,
								foodName,
								foodNutrition: {
									calories,
									carbs,
									fat,
									protein,
									sodium,
									fiber,
									sugar,
								},
							} = food
							return (
								<Table.Row key={_id}>
									<Table.Cell>{foodName}</Table.Cell>
									<Table.Cell>{calories?.value}</Table.Cell>
									<Table.Cell>{protein?.value}</Table.Cell>
									<Table.Cell>{carbs?.value}</Table.Cell>
									<Table.Cell>{fat?.value}</Table.Cell>
									<Table.Cell>{fiber?.value}</Table.Cell>
									<Table.Cell>{sugar?.value}</Table.Cell>
									<Table.Cell>{sodium?.value}</Table.Cell>
								</Table.Row>
							)
						})
					) : (
						<Table.Row></Table.Row>
					)}
				</Table.Body>
				<Table.Footer fullWidth>
					<Table.Row>
						<Table.HeaderCell colSpan='8'>
							<Button
								as={Link}
								to={`/food/add_food/${mealType}`}
								floated='left'
								icon
								basic
								color='blue'
								size='small'
							>
								Add food
							</Button>
						</Table.HeaderCell>
					</Table.Row>
				</Table.Footer>
			</Table>
		</div>
	)
}
