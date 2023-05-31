import { ObjectId } from 'mongodb'
import * as dotenv from "dotenv"
import { getCollection } from '@/modules/connectDb'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const collection = await (await getCollection('users')).find().toArray()

  const itemsPurchased = await Promise.all(collection.map(async (item: any)=>{

    const purchased = await fetch(`http://localhost:3000/api/products/listpurchased`,
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
