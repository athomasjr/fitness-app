import { Segment, Grid, Button, Card, Image } from 'semantic-ui-react'
import { User } from '../../types/generated/graphql'
import Moment from 'react-moment'
import { capitalize } from '../../utils/helpers/capitalize'

interface IProfileHeaderProps {
	user: User
}

export default function ProfileHeader({ user }: IProfileHeaderProps) {
	const photo =
		user.avatar !== null || '' ? (
			<Image src={user.avatar} circular size='small' />
		) : (
			<Image
				circular
				src='https://react.semantic-ui.com/images/avatar/large/matthew.png'
				size='small'
			/>
		)

	const age =
		user.dateOfBirth && user.dateOfBirth !== null ? (
			<Card.Meta>
				<Moment fromNow ago>
					{user.dateOfBirth}
				</Moment>{' '}
				old
			</Card.Meta>
		) : (
			<Card.Meta>I haven't answered this yet...</Card.Meta>
		)

	return (
		<>
			<Segment.Inline
				padded='very'
				style={{ marginBottom: '3rem', marginTop: '3rem' }}
			>
				<Grid columns={2}>
					<Grid.Column>{photo}</Grid.Column>
					<Grid.Column>
						<Card.Group>
							<Card>
								<Card.Content>
									<Card.Header style={{ textTransform: 'capitalize' }}>
										{user.username}
									</Card.Header>
									{age}
									<Card.Meta>{user.gender}</Card.Meta>
									<Card.Meta>
										Member since{' '}
										<Moment format='MMMM D, YYYY'>{user.createdAt}</Moment>
									</Card.Meta>
								</Card.Content>
							</Card>

							<Card>
								<div className='ui two buttons'>
									<Button basic color='blue'>
										Edit Profile
									</Button>
									<Button basic color='blue'>
										Add Photo
									</Button>
								</div>
							</Card>
						</Card.Group>
					</Grid.Column>
				</Grid>
			</Segment.Inline>
		</>
	)
}
