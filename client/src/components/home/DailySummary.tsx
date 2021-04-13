import moment from 'moment'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Grid, Image, Segment, Statistic } from 'semantic-ui-react'
import { useDayTotalsQuery, User } from '../../types/generated/graphql'
import AddWeight from '../utils/buttons/AddWeight'
import WeightModal from '../utils/modals/WeightModal'
export interface IDailySummaryProps {
	user: User
}
export default function DailySummary({ user }: IDailySummaryProps) {
	const [openModal, setOpenModal] = useState(false)

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

	const startingWeight = user.goals?.startingWeight

	const currentWeight = user.goals?.currentWeight

	return (
		<>
			<Segment>
				<Grid columns={4}>
					<Grid.Row stretched>
						<Grid.Column>{photo}</Grid.Column>
						<Grid.Column verticalAlign='middle'>
							<div>
								<Statistic size='small'>
									<Statistic.Label>Calories</Statistic.Label>
									<Statistic.Value>
										{data && data.dayTotals ? data.dayTotals.calorieTotal : 0}
									</Statistic.Value>
								</Statistic>
							</div>
						</Grid.Column>
						<Grid.Column>
							<div>
								<AddWeight
									onClick={() => setOpenModal(true)}
									buttonColor='blue'
								/>
							</div>
							{startingWeight && currentWeight ? (
								<div>
									<Statistic
										horizontal
										size='mini'
										label='lbs lost'
										value={`${startingWeight - currentWeight}`}
									/>
								</div>
							) : null}
						</Grid.Column>
						<Grid.Column>
							<div>
								<Button
									as={Link}
									to={`/food/log`}
									floated='left'
									icon
									basic
									color='blue'
									size='small'
								>
									Add food
								</Button>
							</div>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Segment>

			<WeightModal open={openModal} onClose={() => setOpenModal(false)} />
		</>
	)
}
// ;<Grid>
// 	<Grid.Column width={4}>{photo}</Grid.Column>
// 	<Grid.Column>
// 		<Grid.Row columns='equal'>
// 			<Grid.Column>
// 				<Statistic size='small'>
// 					<Statistic.Label>Calories</Statistic.Label>
// 					<Statistic.Value>
// 						{data && data.dayTotals ? data.dayTotals.calorieTotal : 0}
// 					</Statistic.Value>
// 				</Statistic>
// 			</Grid.Column>
// 			<Grid.Column>
// 				<Button
// 					as={Link}
// 					to={`/food/log`}
// 					floated='left'
// 					icon
// 					basic
// 					color='blue'
// 					size='small'
// 				>
// 					Add food
// 				</Button>
// 			</Grid.Column>
// 		</Grid.Row>
// 		<Grid.Row>
// 			<h1>test</h1>
// 		</Grid.Row>
// 	</Grid.Column>
// </Grid>
