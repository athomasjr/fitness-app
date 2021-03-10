import { useAuthContext } from '../context/auth/auth'

export default function FoodLog() {
	const { user } = useAuthContext()
	return <h1>this is {user!.user.username}'s food log</h1>
}
