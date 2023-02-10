import { ObjectId } from 'mongodb'
import { getCollection } from '@/modules/connectDb'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const collection = await getCollection('products')

  const {
    Title,
    Image,
    productStock,
    Price,
    loginCreateItem,
    category,
    active,
    urlProvider
  } = req.body

  collection.insertOne({
    "_id": new ObjectId(),
    "Title": Title,
    "Image": Image,
    "CountEvaluation": 0,
    "quantitySold": 0,
    "productStock": productStock,
    "Price": Price,
    "Evaluation": 0,
    "dateProduct": new Date(),
    "loginCreateItem": loginCreateItem,
    "category": category,
    "active" : active,
    "urlProvider" : urlProvider
  })

  res.status(200).json({
    status: 'itemCreate'
  })
}
