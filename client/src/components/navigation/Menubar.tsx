import { useState } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
export default function Menubar() {
	const pathname = window.location.pathname
	const path: string = pathname === '/' ? 'home' : pathname.substr(1)
	const [activeItem, setActiveItem] = useState(path)

	function handleLinkClick(e: React.MouseEvent, { name }: any) {
		setActiveItem(name)
	}

	const menuBar: JSX.Element = (
		<Menu pointing secondary size='massive' color='teal'>
			<Menu.Item
				name='home'
				active={activeItem === 'home'}
				as={Link}
				to='/'
				onClick={handleLinkClick}
			/>

			<Menu.Menu position='right'>
				<Menu.Item
					name='register'
					active={activeItem === 'register'}
					as={Link}
					to='/register'
					onClick={handleLinkClick}
				/>
			</Menu.Menu>
		</Menu>
	)

	return menuBar
}
