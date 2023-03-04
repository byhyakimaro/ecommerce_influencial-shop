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
  
  console.log(itemCode)

  const product = await collectionProducts.findOne({ _id: new ObjectId( itemCode )})

  if (product) {

    collectionUsers.updateOne(
      { _id: new ObjectId(token) },
      { $push: { productsInCart: itemCode } }
    )
    res.status(200).json({})
  } else {

    res.status(404).json("Item Not Found")
  }
}
