import { getCollection } from '@/modules/connectDb'
import { ObjectId } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { itemCode, token } = req.body

  console.log(itemCode, token)

  const collection = await getCollection('users', 'members')

  collection.updateOne(
    { _id: new ObjectId(token) },
    { $push: { itemsViewed: itemCode } }
  )

  res.status(200).json({})
}
