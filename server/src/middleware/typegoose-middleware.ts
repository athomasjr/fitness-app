import { Document, Model } from 'mongoose'
import { MiddlewareFn } from 'type-graphql'
import { getClassForDocument } from '@typegoose/typegoose'

export const TypegooseMiddleware: MiddlewareFn = async (_, next) => {
	const result = await next()

	if (Array.isArray(result)) {
		return result.map((item) =>
			item instanceof Model ? convertDocument(item) : item
		)
	}

	if (result instanceof Model) {
		return convertDocument(result)
	}

	return result
}

function convertDocument(doc: Document) {
	const convertedDocument = doc.toObject()
	const DocumentClass = getClassForDocument(doc)!
	Object.setPrototypeOf(convertedDocument, DocumentClass.prototype)
	return convertedDocument
}
