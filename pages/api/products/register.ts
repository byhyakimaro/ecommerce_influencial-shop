import { ObjectId } from 'mongodb'
import { getCollection } from '@/modules/connectDb'
import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuid } from 'uuid'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const collection = await getCollection('products', 'items')

  const {
    Title,
    Image,
    productStock,
    Price,
    loginCreateItem,
    category,
    active
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
    "active" : active
  })

  res.status(200).json({
    status: 'itemCreate'
  })
}
