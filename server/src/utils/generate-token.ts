import { sign } from 'jsonwebtoken'
import { User } from '../graphql/entities/user'

export function generateToken(user: User) {
	return sign(
		{ _id: user._id, username: user.username, email: user.email },
		process.env.JWT_SECRET!,
		{ expiresIn: '1h' }
	)
}
