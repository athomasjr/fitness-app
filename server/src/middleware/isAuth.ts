import { verify } from 'jsonwebtoken';
import { MiddlewareFn } from 'type-graphql';
import { MyContext } from '../types';

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
	const authHeader = context.req.headers['authorization'];

	if (!authHeader) {
		throw new Error('Authorization header must be provided');
	}

	const token = authHeader.split('Bearer ')[1];
	if (token) {
		try {
			const user = verify(token, process.env.JWT_SECRET!);
			context.payload = user as any;
		} catch (error: any) {
			throw new Error('Invalid/Expired token');
		}
	}
	return next();
};
