import moment from 'moment'
import { Grid, Image, Segment, Statistic } from 'semantic-ui-react'
import { useDayTotalsQuery, User } from '../../types/generated/graphql'

export interface IDailySummaryProps {
	user: User
}
export default function DailySummary({ user }: IDailySummaryProps) {
	const photo =
		user.avatar !== null || '' ? (
			<Image src={user.avatar} circular size='medium' />
		) : (
			<Image
				src='https://react.semantic-ui.com/images/avatar/large/matthew.png'
				size='small'
			/>
		)

	const date = moment().format('YYYY-MM-DD')

	const { data } = useDayTotalsQuery({
		variables: {
			userId: user._id!,
			date,
		},
	})

	return (
		<Segment>
			<Grid>
				<Grid.Column>{photo}</Grid.Column>
				<Grid.Column>
					<Statistic size='small'>
						<Statistic.Label>Calories</Statistic.Label>
						<Statistic.Value>{data?.dayTotals.calorieTotal}</Statistic.Value>
					</Statistic>
				</Grid.Column>
			</Grid>
		</Segment>
	)
}
