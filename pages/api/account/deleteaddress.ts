import { getCollection } from '@/modules/connectDb'
import { ObjectId } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { Index, token } = req.body

  if (!Index) {
    res.status(404).json("index not found")
    return
  }

  const collectionUsers = await getCollection('users')
  const { savedAddresses } = await collectionUsers.findOne({ _id: new ObjectId(token) })

  savedAddresses.splice(Index)

  collectionUsers.updateOne(
    { _id: new ObjectId(token) },
      { $set: { savedAddresses: savedAddresses }
    }
  )

  res.status(200).json("Item updated successfully")
}
