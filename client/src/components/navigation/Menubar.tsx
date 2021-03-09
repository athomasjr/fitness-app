import { useState } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../context/auth'
export default function Menubar() {
	const { user, logout } = useAuthContext()
	const pathname = window.location.pathname
	const path: string = pathname === '/' ? 'home' : pathname.substr(1)
	const [activeItem, setActiveItem] = useState(path)

	function handleLinkClick(e: React.MouseEvent, { name }: any) {
		setActiveItem(name)
	}

	const menuBar: JSX.Element = user ? (
		<Menu
			pointing
			secondary
			size='massive'
			color='blue'
			style={{ marginBottom: '5rem' }}
		>
			<Menu.Item name={user.user.username} active as={Link} to='/' />

			<Menu.Menu position='right'>
				<Menu.Item
					name='profile'
					active={activeItem === 'profile'}
					as={Link}
					to='/profile'
					onClick={handleLinkClick}
				/>
				<Menu.Item name='logout' onClick={logout} />
			</Menu.Menu>
		</Menu>
	) : (
		<Menu pointing secondary size='massive' color='blue'>
			<Menu.Item
				name='home'
				active={activeItem === 'home'}
				as={Link}
				to='/'
				onClick={handleLinkClick}
			/>

			<Menu.Menu position='right'>
				<Menu.Item
					name='login'
					active={activeItem === 'login'}
					as={Link}
					to='/login'
					onClick={handleLinkClick}
				/>
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
