import { getCollection } from '@/modules/connectDb'
import { ObjectId } from 'mongodb'
import * as dotenv from "dotenv"
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { token } = req.body

  const collectionUsers = await getCollection('users')
  const dataCollection = await collectionUsers.findOne({ _id: new ObjectId(token)})

  const itemPurchasedClean = await Promise.all(dataCollection.itemsPurchased.map(async (itemPurchased:any) => {

    const products = await Promise.all(itemPurchased.products.map(async (productId:any) =>{
      const product = await fetch(`http://${req?.headers.host}/api/product/${productId}`)

      if (product.status === 200) {
        return await product.json()
      }
    }))

    const orderPurchased = await fetch(`https://api.mercadopago.com/v1/payments/${itemPurchased.id}`,{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.TOKEN_PDC_MERCADO_PAGO
      },
      method: "GET"
    })
    const orderPurchasedAsync = await orderPurchased.json()

    console.log(orderPurchasedAsync)

    return {
      id: itemPurchased.id,
      status: orderPurchasedAsync.status_detail,
      data: itemPurchased.data,
      url: itemPurchased.url,
      methodPayment: itemPurchased.methodPayment,
      products: products
    }
  }))

  res.status(200).json(itemPurchasedClean)
}
