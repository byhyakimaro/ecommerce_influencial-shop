import { getCollection } from '@/modules/connectDb'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { amount, productId } = req.body

  res.status(200).json({amount, productId})
}
