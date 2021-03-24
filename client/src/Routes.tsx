import {
	BrowserRouter as Router,
	// Redirect,
	Route,
	Switch,
} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react'
import './App.css'
import Menubar from './components/navigation/Menubar'
import { AuthProvider } from './context/auth/auth'
import AddFood from './pages/AddFood'
import FoodLog from './pages/FoodLog'
import Home from './pages/Home'
import Login from './pages/Login'
import My404 from './pages/My404'
import Register from './pages/Register'
import UpdateProfile from './pages/UpdateProfile'
import UserProfile from './pages/UserProfile'
import AuthRoute from './utils/AuthRoute'
import ProtectedRoute from './utils/ProtectedRoute'

export default function Routes() {
	return (
		<AuthProvider>
			<Router>
				<Container>
					<Menubar />
					<Switch>
						<Route exact path='/' component={Home} />
						<AuthRoute exact path='/register' component={Register} />
						<AuthRoute exact path='/login' component={Login} />
						<ProtectedRoute exact path='/profile' component={UserProfile} />
						<ProtectedRoute
							exact
							path='/profile/edit'
							component={UpdateProfile}
						/>
						<ProtectedRoute exact path='/food/log/' component={FoodLog} />
						<ProtectedRoute
							exact
							path='/food/add_food/:mealType/:date'
							component={AddFood}
						/>
						{/* <Route render={() => <Redirect to='/' />} /> */}
						<Route component={My404} />
					</Switch>
				</Container>
			</Router>
		</AuthProvider>
	)
}
