import { UserResponse } from './generated/graphql'

export enum LocalStorage {
	JWT_TOKEN = 'jwtToken',
	USER = 'user',
}

export interface IAuthState {
	user: UserResponse | null
}

export interface IAuthContext extends IAuthState {
	login: (userData: UserResponse) => void
	logout: () => void
}

export enum AUTHACTIONENUM {
	LOGIN = 'LOGIN',
	LOGOUT = 'LOGOUT',
}

export type AUTHACTIONTYPE =
	| { type: AUTHACTIONENUM.LOGIN; payload: UserResponse }
	| { type: AUTHACTIONENUM.LOGOUT }
