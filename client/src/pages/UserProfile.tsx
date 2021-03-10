import { Grid, Item, Header } from 'semantic-ui-react'
import ProfileHeader from '../components/user-profile/ProfileHeader'
import { useAuthContext } from '../context/auth/auth'
import { capitalize } from '../utils/helpers/capitalize'

export default function UserProfile() {
	const { user } = useAuthContext()

	const why =
		user && user.user.why !== null
			? user.user.why
			: "I haven't answered that yet"

	const about =
		user && user.user.about !== null
			? user.user.about
			: "I haven't filled this out yet..."

	const inspirations =
		user && user.user.inspirations && user.user.inspirations.length <= 0 ? (
			<Item.Description>I haven't filled this out yet...</Item.Description>
		) : (
			user?.user.inspirations?.map((inspiration, idx) => (
				<Item.Extra key={idx}>{inspiration}</Item.Extra>
			))
		)

	return (
		<Grid columns={1}>
			<Header as='h1'>{capitalize(user!.user.username)}'s profile</Header>
			<Grid.Row centered>
				<ProfileHeader user={user!.user} />
			</Grid.Row>
			<Grid.Row centered>
				<Grid.Column>
					<Item.Group relaxed>
						<Item>
							<Item.Content>
								<Item.Header>About me</Item.Header>
								<Item.Description>{about}</Item.Description>
							</Item.Content>
						</Item>
						<Item>
							<Item.Content>
								<Item.Header>Why I want to get in shape</Item.Header>
								<Item.Description>{why}</Item.Description>
							</Item.Content>
						</Item>
						<Item>
							<Item.Content>
								<Item.Header>My inspirations</Item.Header>
								{inspirations}
							</Item.Content>
						</Item>
					</Item.Group>
				</Grid.Column>
			</Grid.Row>
		</Grid>
	)
}
