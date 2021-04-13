import { useState } from 'react'

export function useForm<T>(callback: Function, initialState: T) {
	const [values, setValues] = useState(initialState)

	function onChange(event: React.ChangeEvent<HTMLInputElement>) {
		setValues({
			...values,
			[event.target.name]: event.target.value,
		})
	}
	function onSubmit(event: React.FormEvent) {
		event.preventDefault()
		callback()
	}

	return {
		onChange,
		onSubmit,
		values,
	}
}
