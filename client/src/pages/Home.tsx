import { Link } from 'react-router-dom'
import { Button, Divider, Grid, Segment } from 'semantic-ui-react'
import DailySummary from '../components/home/DailySummary'
import LoginForm from '../components/login/LoginForm'
import { useAuthContext } from '../context/auth/auth'

export default function Home() {
	const { user } = useAuthContext()

	return (
		<div className={!user ? 'userless-container' : ''}>
			{!user ? (
				<div style={{ width: '100%' }}>
					<Segment placeholder padded='very' size='big'>
						<Grid columns={2}>
							<Grid.Column>
								<LoginForm />
							</Grid.Column>
							<Grid.Column verticalAlign='middle'>
								<Button
									content='Sign up'
									icon='signup'
									size='big'
									as={Link}
									to='/register'
									color='blue'
								/>
							</Grid.Column>
						</Grid>
						<Divider vertical>Or</Divider>
					</Segment>
				</div>
			) : (
				<DailySummary user={user.user} />
			)}
		</div>
	)
}
