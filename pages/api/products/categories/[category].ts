import { getCollection } from '@/modules/connectDb'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { category } : any = req.query

  const collection = await getCollection('products')

  const products = await collection.find().toArray()

  const categoryFiltered = products.filter(({ category }: any) => category =~ category)

  res.status(200).json(categoryFiltered)
}
