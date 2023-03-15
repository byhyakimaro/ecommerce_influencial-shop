import type { NextApiRequest, NextApiResponse } from 'next'

import { getCollection } from '@/modules/connectDb'
import { ObjectId } from 'mongodb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const collection = await getCollection('products')
  const { productId } : any = req.query

  const product = await collection.findOne({ _id: new ObjectId( productId )})

  const off = product?.offersPercentage > 0 && product.offersPercentage

  if (product) {
    res.status(200).json({
      Title: product.Title,
      Description: product.Description,
      Code: productId,
      Category: product.category,
      Image: product.Image,
      Evaluation: product.Evaluation,
      Off: off && off,
      CountEvaluation: product.CountEvaluation,
      productStock: product.productStock,
      Price: (product.Price+product.Price*(product.gainPercentage/100))-(product.Price*(product.offersPercentage/100))
    })
  } else {
    res.status(404).json({
      status: 'Not Found'
    })
  }
}
