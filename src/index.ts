// Imports the Google Cloud client library
const { Storage } = require('@google-cloud/storage')

const listarBuckets = async () => {
  // Instantiates a client. If you don't specify credentials when constructing
  // the client, the client library will look for credentials in the
  // environment.
  const storage = new Storage()

  try {
    // Makes an authenticated API request.
    const results = await storage.getBuckets()

    const [buckets] = results

    console.log('Buckets:')
    buckets.forEach((bucket: any) => {
      console.log(bucket.name)
    })
  } catch (err) {
    console.error('ERROR:', err)
  }
}

const bucketExiste = async (bucketName: string): Promise<boolean> => {
  // Instantiates a client. If you don't specify credentials when constructing
  // the client, the client library will look for credentials in the
  // environment.
  const storage = new Storage()

  bucketName = bucketName.toUpperCase()
  try {
    // Makes an authenticated API request.
    const results = await storage.getBuckets()

    const [buckets] = results

    for (let i = 0; i < buckets.length; i++) {
      if (buckets[i].name.toUpperCase() == bucketName) {
        return true
      }
    }
    return false
  } catch (err) {
    console.error('ERROR:', err)
    throw err
  }
}

const criarBucket = async (bucketName: string) => {
  // Creates a client
  const storage = new Storage()
  // Creates a client from a Google service account key.
  // const storage = new Storage({keyFilename: "key.json"});

  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  // const bucketName = 'auditoria'

  async function createBucket() {
    // Creates the new bucket
    await storage.createBucket(bucketName)
    console.log(`Bucket ${bucketName} created.`)
  }

  if (await bucketExiste(bucketName)) {
    console.log(`Bucket ${bucketName} already exists.`)
  } else {
    await createBucket().catch(console.error)
  }
}

const upload = async (bucketName: string, filename: string) => {
  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // const bucketName = 'Name of a bucket, e.g. my-bucket';
  // const filename = 'Local file to upload, e.g. ./local/path/to/file.txt';

  // Imports the Google Cloud client library
  const { Storage } = require('@google-cloud/storage')

  // Creates a client
  const storage = new Storage()

  async function uploadFile() {
    // https://cloud.google.com/storage/docs/uploading-objects?hl=pt-br

    // Uploads a local file to the bucket
    await storage.bucket(bucketName).upload(filename, {
      // Support for HTTP requests made with `Accept-Encoding: gzip`
      gzip: true,
      // By setting the option `destination`, you can change the name of the
      // object you are uploading to a bucket.
      metadata: {
        // Enable long-lived HTTP caching headers
        // Use only if the contents of the file will never change
        // (If the contents will change, use cacheControl: 'no-cache')
        cacheControl: 'public, max-age=31536000',
      },
    })

    console.log(`${filename} uploaded to ${bucketName}.`)
  }

  await uploadFile().catch(console.error)
}

const listarArquivos = async (bucketName: string) => {
  // https://cloud.google.com/storage/docs/listing-objects?hl=pt-br

  /**
   * TODO(developer): Uncomment the following line before running the sample.
   */
  // const bucketName = 'Name of a bucket, e.g. my-bucket';

  // Imports the Google Cloud client library
  const { Storage } = require('@google-cloud/storage')

  // Creates a client
  const storage = new Storage()

  async function listFiles() {
    // Lists files in the bucket
    const [files] = await storage.bucket(bucketName).getFiles()

    console.log('Files:')
    files.forEach((file: any) => {
      console.log(file.name)
    })
  }

  await listFiles().catch(console.error)
}

const deleteFile = async (bucketName: string, filename: string) => {
  // https://cloud.google.com/storage/docs/deleting-objects?hl=pt-br#storage-delete-object-nodejs

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // const bucketName = 'Name of a bucket, e.g. my-bucket';
  // const filename = 'File to delete, e.g. file.txt';

  // Imports the Google Cloud client library
  const { Storage } = require('@google-cloud/storage')

  // Creates a client
  const storage = new Storage()

  async function deleteFile() {
    // Deletes the file from the bucket
    await storage.bucket(bucketName).file(filename).delete()

    console.log(`gs://${bucketName}/${filename} deleted.`)
  }

  await deleteFile().catch(console.error)
}

const downloadFile = async (bucketName: string, srcFilename: string, destFilename: string) => {
  // https://cloud.google.com/storage/docs/downloading-objects?hl=pt-br

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // const bucketName = 'Name of a bucket, e.g. my-bucket';
  // const srcFilename = 'Remote file to download, e.g. file.txt';
  // const destFilename = 'Local destination for file, e.g. ./local/path/to/file.txt';

  // Imports the Google Cloud client library
  const { Storage } = require('@google-cloud/storage')

  // Creates a client
  const storage = new Storage()

  async function downloadFile() {
    const options = {
      // The path to which the file should be downloaded, e.g. "./file.txt"
      destination: destFilename,
    }

    // Downloads the file
    await storage.bucket(bucketName).file(srcFilename).download(options)

    console.log(`gs://${bucketName}/${srcFilename} downloaded to ${destFilename}.`)
  }

  downloadFile().catch(console.error)
}

const renameFile = async (bucketName: string, filename: string, newFilename: string) => {
  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // const bucketName = 'Name of a bucket, e.g. my-bucket';
  // const srcFilename = 'File to move, e.g. file.txt';
  // const destFilename = 'Destination for file, e.g. moved.txt';

  // Imports the Google Cloud client library
  const { Storage } = require('@google-cloud/storage')

  // Creates a client
  const storage = new Storage()

  async function moveFile() {
    // Moves the file within the bucket
    await storage.bucket(bucketName).file(filename).move(newFilename)

    console.log(`gs://${bucketName}/${filename} moved to gs://${bucketName}/${newFilename}.`)
  }

  moveFile().catch(console.error)
}

const usarCloudStorage = async () => {
  // todas as linhas comentadas estão válidas e funcionando:

  // listarBuckets()
  await criarBucket('auditoria')
  // await upload('auditoria', 'package.json')
  // await upload('auditoria', 'nodemon.json')
  // await deleteFile('auditoria', 'nodemon.json')
  await listarArquivos('auditoria')
  // await downloadFile('auditoria', 'package.json', 'c:\\temp\\package.json')
  // await renameFile('auditoria', 'package.json', 'package2.json')
}

usarCloudStorage()
