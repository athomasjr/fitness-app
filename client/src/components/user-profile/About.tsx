import { Item } from 'semantic-ui-react'

export interface IAboutProps {
	why: string | undefined
	about: string | undefined
	inspirations: JSX.Element | JSX.Element[] | undefined
}

export default function About({ about, why, inspirations }: IAboutProps) {
	return (
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
	)
}
