import { getCollection } from '@/modules/connectDb'
import { ObjectId } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { address, token } = req.body

  const collectionUsers = await getCollection('users')

  const dataCollection = await collectionUsers.findOne({ _id: new ObjectId(token)})

  collectionUsers.updateOne(
    { _id: new ObjectId(token) },
    { $set: { savedAddresses: { [address.Index]: address.Edited} }
    }
  )

  res.status(200).json("Item updated successfully")
}
