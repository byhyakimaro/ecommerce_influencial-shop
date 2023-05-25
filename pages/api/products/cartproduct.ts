import { getCollection } from '@/modules/connectDb'
import { ObjectId } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { itemCode, token } = req.body

  const collectionUsers = await getCollection('users')
  const collectionProducts = await getCollection('products')

  const product = await collectionProducts.findOne({ _id: new ObjectId( itemCode )})
  const user = await collectionUsers.findOne({ _id: new ObjectId(token) })

  if (product && token) {

    const products = user.productsInCart.products
    products.push(itemCode)

    const productsFormatted: any[] = products.filter((item: any, 
      index: any) => products.indexOf(item) === index)

    collectionUsers.updateOne(
      { _id: new ObjectId(token) },
      { $set: { productsInCart: {
        methodPayment: user.productsInCart.methodPayment,
        saveAddress: 0,
        products: productsFormatted
      } }
      }
    )
    res.status(200).json("Item updated successfully")
  } else {

    res.status(404).json("Item Not Found")
  }
}
