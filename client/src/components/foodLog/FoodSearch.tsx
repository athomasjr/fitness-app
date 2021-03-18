import React, { useState } from 'react'
import { Form, Input, Message } from 'semantic-ui-react'
import useFetch from '../../hooks/useFetch'
import SearchDisplay from './SearchDisplay'

export default function FoodSearch() {
	const [query, setQuery] = useState('')
	const [results, setResults] = useState([])

	const { data: foods, loading, error } = useFetch(
		`&pageSize=10&query=${query}`
	)

	// console.log(results)

	console.log(foods)
	console.log(query.length)

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
			{query.length > 0 && <SearchDisplay foods={foods} />}
		</>
	)
}
