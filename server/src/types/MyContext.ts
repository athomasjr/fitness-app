import { Request, Response } from 'express'
import { User } from '../graphql/entities/user'

export type MyContext = {
	req: Request
	res: Response
	payload?: User
}
