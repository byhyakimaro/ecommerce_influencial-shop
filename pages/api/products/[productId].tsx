import type { NextApiRequest, NextApiResponse } from 'next'

import { getCollection } from '@/modules/connectDb'
import { ObjectId } from 'mongodb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const collection = await getCollection('products', 'items')
  const { productId } : any = req.query

  const product = await collection.findOne({ _id: new ObjectId( productId )})

  if (product) {
    res.status(200).json({
      Title: product.Title,
      Image: product.Image,
      Evaluation: product.Evaluation,
      CountEvaluation: product.CountEvaluation,
      productStock: product.productStock,
      Price: product.Price
    })
  } else {
    res.status(404).json({
      status: 'Not Found'
    })
  }
}
