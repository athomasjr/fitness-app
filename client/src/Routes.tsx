import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import Home from './pages/Home'
import Register from './pages/Register'
import Menubar from './components/navigation/Menubar'
import { AuthProvider } from './context/auth'

import 'semantic-ui-css/semantic.min.css'
import './App.css'
import Login from './pages/Login'
import AuthRoute from './utils/AuthRoute'
import ProtectedRoute from './utils/ProtectedRoute'
import UserProfile from './pages/UserProfile'
import UpdateProfile from './pages/UpdateProfile'

export default function Routes() {
	return (
		<AuthProvider>
			<Router>
				<Container>
					<Menubar />
					<Route exact path='/' component={Home} />
					<AuthRoute exact path='/register' component={Register} />
					<AuthRoute exact path='/login' component={Login} />
					<ProtectedRoute exact path='/profile' component={UserProfile} />
					<ProtectedRoute
						exact
						path='/profile/edit'
						component={UpdateProfile}
					/>
				</Container>
			</Router>
		</AuthProvider>
	)
}
