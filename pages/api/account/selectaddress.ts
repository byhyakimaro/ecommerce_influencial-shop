import { getCollection } from '@/modules/connectDb'
import { ObjectId } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { addressIndex, token } = req.body

  if (!addressIndex) {
    res.status(404).json("Address Index not found")
    return
  }

  const collectionUsers = await getCollection('users')

  collectionUsers.updateOne(
    { _id: new ObjectId(token) },
      { $set: { defaultAddress: parseInt(addressIndex) }
    }
  )
  console.log(addressIndex, token)

  res.status(200).json("Item updated successfully")
}
