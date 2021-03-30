import { Table } from 'semantic-ui-react'
import { TotalNutrition } from '../../../types/generated/graphql'
export interface IDayTotalsProps {
	dayNutrition: TotalNutrition
}

export default function DayTotals({ dayNutrition }: IDayTotalsProps) {
	const tableBody =
		dayNutrition === undefined ? (
			<>
				<Table.Cell>0</Table.Cell>
				<Table.Cell>0</Table.Cell>
				<Table.Cell>0</Table.Cell>
				<Table.Cell>0</Table.Cell>
			</>
		) : (
			<>
				<Table.Cell>{dayNutrition.calorieTotal}</Table.Cell>
				<Table.Cell>{dayNutrition.proteinTotal}</Table.Cell>
				<Table.Cell>{dayNutrition.carbsTotal}</Table.Cell>
				<Table.Cell>{dayNutrition.fatTotal}</Table.Cell>
			</>
		)

	return (
		<div style={{ marginTop: '5rem' }}>
			<Table definition>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell />
						<Table.HeaderCell>Calories</Table.HeaderCell>
						<Table.HeaderCell>Protein</Table.HeaderCell>
						<Table.HeaderCell>Carbs</Table.HeaderCell>
						<Table.HeaderCell>Fat</Table.HeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>
					<Table.Row>
						<Table.Cell>Totals</Table.Cell>
						{tableBody}
					</Table.Row>
				</Table.Body>
			</Table>
		</div>
	)
}
