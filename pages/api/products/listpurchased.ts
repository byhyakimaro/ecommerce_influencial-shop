import { getCollection } from '@/modules/connectDb'
import { ObjectId } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { token } = req.body

  const collectionUsers = await getCollection('users')
  const dataCollection = await collectionUsers.findOne({ _id: new ObjectId(token)})

  dataCollection.itemsPurchased.map(async (itemPurchased:any) => {

    const products = await Promise.all(itemPurchased.products.map(async (productId:any) =>{
      const product = await fetch(`http://${req?.headers.host}/api/product/${productId}`)

      if (product.status === 200) {
        return await product.json()
      }
    }))

    return {
      id: itemPurchased.id,
      status: itemPurchased.status,
      data: itemPurchased.data,
      url: itemPurchased.url,
      methodPayment: itemPurchased.methodPayment,
      products: products
    }
  })

  res.status(200).json(dataCollection.itemsPurchased)
}
