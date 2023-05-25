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

  const productFind = await collectionProducts.findOne({ _id: new ObjectId(itemCode)})
  const dataCollection = await collectionUsers.findOne({ _id: new ObjectId(token)})

  if (productFind && dataCollection) {

    collectionUsers.updateOne(
      { _id: new ObjectId(token) },
      { $set: { productsInCart: {
        methodPayment: dataCollection.productsInCart.methodPayment,
        saveAddress: 0,
        products: dataCollection.productsInCart.products.filter((product:any) => product !== itemCode)
      } } }
    )
    res.status(200).json("Item Removed successfully")
  } else {

    res.status(404).json("Item Not Found")
  }
}
