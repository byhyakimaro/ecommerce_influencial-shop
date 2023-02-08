import type { NextApiRequest, NextApiResponse } from 'next'

import { getCollection } from '@/modules/connectDb'
import { ObjectId } from 'mongodb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const collection = await getCollection('products', 'items')
  const { productId } : any = req.query

  try {
    const { 
      Title,
      Image,
      Evaluation,
      CountEvaluation,
      productStock,
      Price,
    } = await collection.findOne({ _id: new ObjectId( productId )})

    res.status(200).json({
      Title,
      Image,
      Evaluation,
      CountEvaluation,
      productStock,
      Price,
    })
  } catch(err) {
    res.status(404).json({ "notFound": true })
  }

}
