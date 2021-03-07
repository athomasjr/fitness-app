import { createContext, useReducer, useContext } from 'react'
import jwtDecode, { JwtPayload } from 'jwt-decode'
import {
	AUTHACTIONENUM,
	AUTHACTIONTYPE,
	IAuthContext,
	IAuthState,
	LocalStorage,
} from '../types/authContext'
import { UserResponse } from '../types/generated/graphql'

const initialState: IAuthState = { user: null }

const storedUser = localStorage.getItem(LocalStorage.USER)

if (storedUser && typeof storedUser === 'string') {
	const parsedUser: UserResponse = JSON.parse(storedUser)
	const decodedToken = jwtDecode<JwtPayload>(parsedUser.token)

	if (decodedToken.exp && decodedToken.exp * 1000 < Date.now()) {
		localStorage.removeItem(LocalStorage.USER)
	} else {
		initialState.user = parsedUser
	}
}

const AuthContext = createContext<IAuthContext>({
	user: null,
	login: (userDate) => {},
	logout: () => {},
})

function authReducer(state: IAuthState, action: AUTHACTIONTYPE) {
	switch (action.type) {
		case AUTHACTIONENUM.LOGIN:
			return {
				...state,
				user: action.payload,
			}
		case AUTHACTIONENUM.LOGOUT:
			return {
				...state,
				user: null,
			}
		default:
			return state
	}
}

function AuthProvider(props: any) {
	const [state, dispatch] = useReducer(authReducer, initialState)

	function login(userData: UserResponse) {
		dispatch({
			type: AUTHACTIONENUM.LOGIN,
			payload: userData,
		})
		localStorage.setItem(LocalStorage.USER, JSON.stringify(userData))
	}

	function logout() {
		dispatch({
			type: AUTHACTIONENUM.LOGOUT,
		})
		localStorage.removeItem(LocalStorage.USER)
	}
	return (
		<AuthContext.Provider
			value={{ user: state.user, login, logout }}
			{...props}
		/>
	)
}

export function useAuthContext() {
	return useContext(AuthContext)
}

export { AuthProvider }
