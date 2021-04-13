import { config } from 'dotenv'
config()

export const s3Config = {
	signatureVersion: 'v4',
	region: process.env.AWS_S3_REGION!,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
	},
	app: {
		storageDir: 'tmp',
	},
}
