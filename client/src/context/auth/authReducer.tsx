import {
	AUTHACTIONENUM,
	AUTHACTIONTYPE,
	IAuthState,
} from '../../types/authContext'

export function authReducer(state: IAuthState, action: AUTHACTIONTYPE) {
	switch (action.type) {
		case AUTHACTIONENUM.LOGIN:
			return {
				...state,
				user: action.payload,
			}
		case AUTHACTIONENUM.UPDATE:
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
