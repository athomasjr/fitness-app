import { Grid, Item, Header } from 'semantic-ui-react'
import ProfileHeader from '../components/user-profile/ProfileHeader'
import { useAuthContext } from '../context/auth'
import { capitalize } from '../utils/helpers/capitalize'

export default function UserProfile() {
	const { user } = useAuthContext()
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
								<Item.Description>
									{user && user.user.about !== null
										? user.user.about
										: "I haven't filled this out yet..."}
								</Item.Description>
							</Item.Content>
						</Item>
						<Item>
							<Item.Content>
								<Item.Header>Why I want to get in shape</Item.Header>
								<Item.Description>
									I haven't filled this out yet...
								</Item.Description>
							</Item.Content>
						</Item>
						<Item>
							<Item.Content>
								<Item.Header>My inspirations</Item.Header>
								<Item.Description>
									I haven't filled this out yet...
								</Item.Description>
							</Item.Content>
						</Item>
					</Item.Group>
				</Grid.Column>
			</Grid.Row>
		</Grid>
	)
}
