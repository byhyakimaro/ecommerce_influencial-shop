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
    category
  } = req.body

  collection.insertOne({
    "_id": {
      "$oid": uuid()
    },
    "Title": Title,
    "Image": Image,
    "CountEvaluation": 0,
    "quantitySold": 0,
    "productStock": productStock,
    "Price": Price,
    "Evaluation": 0,
    "dateProduct": {
      "$date": {
        "$numberLong": new Date()
      }
    },
    "loginCreateItem": loginCreateItem,
    "category": category
  })

  res.status(200).json({})
}
