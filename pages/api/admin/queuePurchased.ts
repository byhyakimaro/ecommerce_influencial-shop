import { ObjectId } from 'mongodb'
import * as dotenv from "dotenv"
import { getCollection } from '@/modules/connectDb'
import type { NextApiRequest, NextApiResponse } from 'next'

const host: any = process.env.HOST_API_URL

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const collection = await (await getCollection('users')).find().toArray()

  const itemsPurchased = await Promise.all(collection.map(async (item: any)=>{

    const purchased = await fetch(`${host}/api/products/listpurchased`,
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ token: item["_id"].toString() })
    })
    const itemsPurchased = await purchased.json()

    return {userItems: item.login, listItems: itemsPurchased}
  }))

  res.status(200).json(itemsPurchased)
}
