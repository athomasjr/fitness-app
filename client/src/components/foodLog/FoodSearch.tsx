import { useState } from 'react'
import { Form, Input, Message } from 'semantic-ui-react'
import useFetch from '../../hooks/useFetch'
import SearchDisplayContainer from './containers/SearchDisplayContainer'

export default function FoodSearch() {
	const [query, setQuery] = useState('')

	const { data: foods, loading, error } = useFetch(
		`&pageSize=10&dataType=Branded,Survey%20(FNDDS)&query=${query}`
	)

	return (
		<>
			<div className='form-container'>
				<Form onSubmit={(e) => e.preventDefault()}>
					<Input
						fluid
						type='text'
						placeholder='Search for food...'
						icon='search'
						loading={loading ? true : false}
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						error={error.show ? true : false}
					/>
					{error.show && (
						<Message negative>
							<Message.Header>{error.msg}</Message.Header>
						</Message>
					)}
				</Form>
			</div>
			{query.length > 0 && <SearchDisplayContainer foods={foods} />}
		</>
	)
}
