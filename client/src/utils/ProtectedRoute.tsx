import { Route, Redirect } from 'react-router-dom'
import { useAuthContext } from '../context/auth/auth'

export default function ProtectedRoute({ component: Component, ...rest }: any) {
	const { user } = useAuthContext()

	return (
		<Route
			{...rest}
			render={(props) =>
				user ? <Component {...props} /> : <Redirect to='/' />
			}
		/>
	)
}
