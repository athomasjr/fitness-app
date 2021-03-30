import {
	ApolloClient,
	ApolloProvider,
	createHttpLink,
	InMemoryCache,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import Routes from '../Routes'
import { LocalStorage } from '../types/authContext'
import { UserResponse } from '../types/generated/graphql'

const httpLink = createHttpLink({
	uri: 'http://localhost:3001/graphql',
})

const authLink = setContext(() => {
	const storedUser = localStorage.getItem(LocalStorage.USER)

	if (storedUser && typeof storedUser === 'string') {
		const parsedUser: UserResponse = JSON.parse(storedUser)
		const token = parsedUser.token
		return {
			headers: {
				Authorization: token ? `Bearer ${token}` : '',
			},
		}
	}
})

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache({
		typePolicies: {
			Meal: {
				fields: {
					foods: {
						merge: false,
					},
				},
			},
		},
	}),
	connectToDevTools: true,
})

export default (
	<ApolloProvider client={client}>
		<Routes />
	</ApolloProvider>
)
