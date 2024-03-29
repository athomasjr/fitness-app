import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import { useAuthContext } from '../../context/auth/auth'
import { SessionStorage } from '../../types/authContext'
export default function Menubar() {
	const { user, logout } = useAuthContext()
	const pathname = window.location.pathname
	const path: string = pathname === '/' ? 'home' : pathname.substr(1)

	const [activeItem, setActiveItem] = useState(path)

	function handleLinkClick(e: React.MouseEvent, { name }: any) {
		setActiveItem(name)
		sessionStorage.removeItem(SessionStorage.DATE)
	}

	function handleLogout() {
		logout()
		setActiveItem('home')
	}

	const menuBar: JSX.Element = user ? (
		<Menu
			pointing
			secondary
			size='massive'
			color='blue'
			style={{ marginBottom: '5rem' }}
		>
			<Menu.Item
				name={user.user.username}
				active
				as={Link}
				to='/'
				onClick={() => sessionStorage.removeItem(SessionStorage.DATE)}
			/>

			<Menu.Menu position='right'>
				<Menu.Item
					name='profile'
					active={activeItem === 'profile'}
					as={Link}
					to='/profile'
					onClick={handleLinkClick}
				/>
				<Menu.Item
					name='food'
					active={path === 'food/log'}
					as={Link}
					to='/food/log'
					// onClick={(e, data) => setActiveItem(data.name as any)}
					onClick={handleLinkClick}
				/>
				<Menu.Item name='logout' onClick={handleLogout} />
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
