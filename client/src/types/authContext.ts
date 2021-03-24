import { UserResponse } from './generated/graphql'

export enum LocalStorage {
	JWT_TOKEN = 'jwtToken',
	USER = 'user',
	DATE = 'date',
}

export interface IAuthState {
	user: UserResponse | null
}

export interface IAuthContext extends IAuthState {
	login: (userData: UserResponse) => void
	update: (userData: UserResponse) => void
	logout: () => void
}

export enum AUTHACTIONENUM {
	LOGIN = 'LOGIN',
	LOGOUT = 'LOGOUT',
	UPDATE = 'UPDATE',
}

export type AUTHACTIONTYPE =
	| { type: AUTHACTIONENUM.LOGIN; payload: UserResponse }
	| { type: AUTHACTIONENUM.UPDATE; payload: UserResponse }
	| { type: AUTHACTIONENUM.LOGOUT }
