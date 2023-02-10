import { MongoClient } from 'mongodb'
import * as dotenv from "dotenv"

dotenv.config({ path: __dirname+'/.env' })

const URI: any = process.env.DB_URI
const client = new MongoClient(URI)

let state: any
let conn: any

async function connect() {
	if (conn && state === 'connected') {
		return conn
	}
	
	const connection: any = await client.connect()
	console.log('Connected successfully to database')

	state = connection.topology.s.state
	conn = connection.db("InfluencialShop")

	return conn
}

export async function getCollection(collectionName: string) {
	const db = await connect()
	return await db.collection(collectionName)
}
