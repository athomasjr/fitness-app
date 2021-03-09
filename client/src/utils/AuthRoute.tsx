import { useAuthContext } from '../context/auth'
import { Route, Redirect } from 'react-router-dom'

export default function AuthRoute({ component: Component, ...rest }: any) {
	const { user } = useAuthContext()
	return (
		<Route
			{...rest}
			render={(props) =>
				user ? <Redirect to='/' /> : <Component {...props} />
			}
		/>
	)
}
