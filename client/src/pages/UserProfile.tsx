import { Grid, Header, Item } from 'semantic-ui-react'
import About, { IAboutProps } from '../components/user-profile/About'
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

	const aboutProps: IAboutProps = { why, about, inspirations }

	return (
		<Grid columns={1}>
			<Header as='h1'>{capitalize(user!.user.username)}'s profile</Header>
			<Grid.Row centered>
				<ProfileHeader user={user!.user} />
			</Grid.Row>
			<Grid.Row centered>
				<Grid.Column>
					<About {...aboutProps} />
				</Grid.Column>
			</Grid.Row>
		</Grid>
	)
}
