import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import Home from './pages/Home'
import Register from './pages/Register'
import Menubar from './components/navigation/Menubar'
import { AuthProvider } from './context/auth'

import 'semantic-ui-css/semantic.min.css'
import './App.css'

export default function Routes() {
	return (
		<AuthProvider>
			<Router>
				<Container>
					<Menubar />
					<Route exact path='/' component={Home} />
					<Route exact path='/register' component={Register} />
				</Container>
			</Router>
		</AuthProvider>
	)
}
