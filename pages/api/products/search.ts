import { getCollection } from '@/modules/connectDb'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { search } = req.body

  const collection = await getCollection('products')

  const regex = new RegExp(`^.*${search}.*$`, 'gi')
  const products = await collection.find({ Title: {$regex: regex } }).toArray()

  res.status(200).json(products)
}
