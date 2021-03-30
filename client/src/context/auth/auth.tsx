import jwtDecode, { JwtPayload } from 'jwt-decode'
import { createContext, useContext, useReducer } from 'react'
import {
	AUTHACTIONENUM,
	IAuthContext,
	IAuthState,
	LocalStorage,
	SessionStorage,
} from '../../types/authContext'
import { UserResponse } from '../../types/generated/graphql'
import { authReducer } from './authReducer'

const initialState: IAuthState = { user: null }

const storedUser = localStorage.getItem(LocalStorage.USER)

if (storedUser && typeof storedUser === 'string') {
	const parsedUser: UserResponse = JSON.parse(storedUser)
	const decodedToken = jwtDecode<JwtPayload>(parsedUser.token)

	if (decodedToken.exp && decodedToken.exp * 1000 < Date.now()) {
		localStorage.removeItem(LocalStorage.USER)
		sessionStorage.removeItem(SessionStorage.DATE)
	} else {
		initialState.user = parsedUser
	}
}

const AuthContext = createContext<IAuthContext>({
	user: null,
	login: (userDate) => {},
	update: (userData: UserResponse) => {},
	logout: () => {},
})

function AuthProvider(props: any) {
	const [state, dispatch] = useReducer(authReducer, initialState)

	function login(userData: UserResponse) {
		dispatch({
			type: AUTHACTIONENUM.LOGIN,
			payload: userData,
		})
		localStorage.setItem(LocalStorage.USER, JSON.stringify(userData))
	}

	function update(userData: UserResponse) {
		dispatch({
			type: AUTHACTIONENUM.UPDATE,
			payload: userData,
		})
		localStorage.setItem(LocalStorage.USER, JSON.stringify(userData))
	}

	function logout() {
		dispatch({
			type: AUTHACTIONENUM.LOGOUT,
		})
		localStorage.removeItem(LocalStorage.USER)
		sessionStorage.removeItem(SessionStorage.DATE)
	}
	return (
		<AuthContext.Provider
			value={{ user: state.user, login, update, logout }}
			{...props}
		/>
	)
}

export function useAuthContext() {
	return useContext(AuthContext)
}

export { AuthProvider }
