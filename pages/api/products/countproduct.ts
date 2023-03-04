import { getCollection } from '@/modules/connectDb'
import { ObjectId } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { itemCode, token } = req.body

  const collectionUsers = await getCollection('users')
  const collectionProducts = await getCollection('products')
  
  const product = await collectionUsers.findOne({ _id: new ObjectId( itemCode )})

  if (product) {

    collectionProducts.updateOne(
      { _id: new ObjectId(token) },
      { $push: { itemsViewed: itemCode } }
    )
    res.status(200).json({})
  } else {

    res.status(404).json("Item Not Found")
  }
}
