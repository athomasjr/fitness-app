import AWS from 'aws-sdk'
import { ReadStream } from 'fs'
import stream from 'stream'

// type S3UploadStream = {
// 	writeStream: stream.PassThrough
// 	promise: Promise<AWS.S3.ManagedUpload.SendData>
// }

type S3UploadConfig = {
	accessKeyId: string
	secretAccessKey: string
	destinationBucketName: string
	region?: string
}
export type File = {
	filename: string
	mimetype: string
	encoding: string
	stream?: ReadStream
}
export type UploadedFileResponse = {
	filename: string
	mimetype: string
	encoding: string
	url: string
}

export class AWSS3Uploader {
	private s3: AWS.S3
	public config: S3UploadConfig

	constructor(config: S3UploadConfig) {
		AWS.config = new AWS.Config()
		AWS.config.update({
			region: config.region || 'ca-central-1',
			accessKeyId: config.accessKeyId,
			secretAccessKey: config.secretAccessKey,
		})

		this.s3 = new AWS.S3()
		this.config = config
	}

	createUploadStream(key: string) {
		const pass = new stream.PassThrough()
		return {
			writeStream: pass,
			promise: this.s3
				.upload({
					Bucket: this.config.destinationBucketName,
					Key: key,
					Body: pass,
				})
				.promise(),
		}
	}

	createDestinationFilePath(
		fileName: string
		// mimetype: string,
		// encoding: string
	): string {
		return fileName
	}
}
