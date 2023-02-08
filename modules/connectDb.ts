import { MongoClient } from 'mongodb'
import * as dotenv from "dotenv"

dotenv.config({ path: __dirname+'/.env' })

const url = `mongodb+srv://${process.env.DB_HOST}:${process.env.DB_PASSWORD}@cluster0.kpcau.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(url)

let state: any
let conn: any
async function connect(dbName: string) {
	if (conn && state === 'connected') {
		return conn
	}
	
	const connection: any = await client.connect()
	console.log('Connected successfully to database')

	state = connection.topology.s.state
	conn = connection.db(dbName)
	return conn
}

export async function getCollection(dbName: string, collectionName: string) {
	const db = await connect(dbName)
	return await db.collection(collectionName)
}
