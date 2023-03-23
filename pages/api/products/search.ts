import { getCollection } from '@/modules/connectDb'
import { ObjectId } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { search } = req.body

  const collection = await getCollection('products')
  
  const groupRegex = (search).split(' ').map((item:any)=>{
    return `(?=.*\\b${item}\\b)`
  }).join('')

  const regex = new RegExp(`^${groupRegex}.*$`, 'gi')
  const products = await collection.find({ Title: {$regex: regex } }).toArray()

  products.forEach((product:any) => {
    collection.updateOne(
      { _id: new ObjectId(product["_id"]) },
      { $inc: { Impressions: 1 } }
    )
  })

  res.status(200).json(products)
}
