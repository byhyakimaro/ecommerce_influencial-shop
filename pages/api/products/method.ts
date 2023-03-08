import { getCollection } from '@/modules/connectDb'
import { ObjectId } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, token, products } = req.body

  const collectionUsers = await getCollection('users')

  collectionUsers.updateOne(
    { _id: new ObjectId(token) },
    { $push: { itemsRequest: {
        id: Math.floor(Math.random() * 1000000000),
        methodPayment: method,
        products: products,
        checkout: "pending"
      } }
    }
  )

  res.status(200).json("Item updated successfully")
}
