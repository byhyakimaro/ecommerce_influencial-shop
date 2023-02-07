import { MongoClient } from 'mongodb'
import * as dotenv from "dotenv"

dotenv.config({ path: __dirname+'/.env' })

const url = `mongodb+srv://${process.env.DB_HOST}:${process.env.DB_PASSWORD}@cluster0.kpcau.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(url)

let state: any
let conn: any
export async function connect() {
	if (conn && state === 'connected') {
		return conn
	}
	
	const connection: any = await client.connect()
	console.log('Connected successfully to database')

	state = connection.topology.s.state
	conn = connection.db('users')
	return conn
}

export async function getCollection() {
	const db = await connect()
	return await db.collection('members')
}
