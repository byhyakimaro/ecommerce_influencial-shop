import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next'

import { getCollection } from '@/modules/connectDb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const { token } = req.body

  const collection = await getCollection()

  const dataCollection = await collection.findOne({ _id: new ObjectId(token)})

  if (dataCollection) {
    res.status(200).json({
      token: dataCollection["_id"],
      user: {
        name: dataCollection.name,
        email: dataCollection.email,
        telephone: dataCollection.telephone,
        avatarUrl: dataCollection.avatarUrl
      }
    })
  }
}
