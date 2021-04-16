import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import { Container, Loader } from 'semantic-ui-react'
import './App.css'
import Menubar from './components/navigation/Menubar'
import { AuthProvider } from './context/auth/auth'
import AuthRoute from './utils/AuthRoute'
import ProtectedRoute from './utils/ProtectedRoute'

const AddFood = lazy(() => import('./pages/AddFood'))
const FoodLog = lazy(() => import('./pages/FoodLog'))
const Login = lazy(() => import('./pages/Login'))
const My404 = lazy(() => import('./pages/My404'))
const ProfilePictureUpload = lazy(() => import('./pages/ProfilePictureUpload'))
const Register = lazy(() => import('./pages/Register'))
const UpdateProfile = lazy(() => import('./pages/UpdateProfile'))
const UserProfile = lazy(() => import('./pages/UserProfile'))
const Home = lazy(() => import('./pages/Home'))
export default function Routes() {
	return (
		<AuthProvider>
			<Router>
				<Container>
					<Menubar />
					<Suspense fallback={<Loader active inline='centered' />}>
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
							<ProtectedRoute
								exact
								path='/profile/edit/avatar'
								component={ProfilePictureUpload}
							/>
							{/* <Route render={() => <Redirect to='/' />} /> */}
							<Route component={My404} />
						</Switch>
					</Suspense>
				</Container>
			</Router>
		</AuthProvider>
	)
}
