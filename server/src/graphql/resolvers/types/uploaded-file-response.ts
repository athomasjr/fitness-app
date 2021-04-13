import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class UploadedFileResponse {
	@Field()
	filename!: string

	@Field()
	mimetype!: string

	@Field()
	encoding!: string

	@Field()
	url!: string
}
