import { ObjectId } from 'mongodb'
import { getCollection } from '@/modules/connectDb'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const collection = await (await getCollection('users')).find().toArray()

  const itemsPurchased = collection.map((item: any)=>{
    return {userItems: item.login, listItems: item.itemsPurchased}
  })

  res.status(200).json(itemsPurchased)
}
