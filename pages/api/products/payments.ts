import { getCollection } from '@/modules/connectDb'
import type { NextApiRequest, NextApiResponse } from 'next'
import * as dotenv from "dotenv"
import { ObjectId } from 'mongodb'

dotenv.config({ path: __dirname+'/.env' })

function getPayment(amount:any, description:any, method:any) {
  return fetch('https://api.mercadopago.com/v1/payments',{
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + process.env.TOKEN_PDC_MERCADO_PAGO
  },
  method: "POST",
  body: JSON.stringify({
    "transaction_amount": amount,
    "description": description,
    "payment_method_id": method,
    "payer": {
      "email": "gerson@gmail.com",
      "first_name": "Gerson Dev",
      "last_name": "JS python html",
      "identification": {
        "type": "CPF",
        "number": "01234567890"
      }
    },
    "notification_url": "https://eo4egxx7g9fr7u7.m.pipedream.net"
  })
  })
  .then((response:any) => response.json())
  .then((responseData) => {
    return responseData
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { token } = req.body

  const collectionConfigs = await getCollection('configs')
  const configs = await collectionConfigs.findOne()

  const collectionUsers = await getCollection('users')
  const dataCollection = await collectionUsers.findOne({ _id: new ObjectId(token)})

  const cartUser = dataCollection.productsInCart

  if (Object.keys(cartUser).length === 0) {

    res.status(404).json("Cart Empty")
  } else {

    const productsInCartFormatted: any[] = dataCollection.productsInCart.products.filter((item: any, 
      index: any) => dataCollection.productsInCart.products.indexOf(item) === index)
    
    const productsInCart = await Promise.all(productsInCartFormatted.map(async (productId:any) =>{
      const product = await fetch(`http://${req?.headers.host}/api/product/${productId}`)

      if (product.status === 200) {
        return await product.json()
      }
    }))

    const productsInCartFormat = productsInCart?.filter(function( element ) { return element !== undefined })

    const amount = (productsInCartFormat?.reduce((a: any,v: any) =>  a = a + v.Price , 0))
    
    if (cartUser.methodPayment === "pix") {
      const payment = await getPayment(parseFloat((amount-(amount*(configs.percentPixOff/100))).toFixed(2)), "test", cartUser.methodPayment)

      collectionUsers.updateOne(
        { _id: new ObjectId(token) },
        { $addToSet: { itemsPurchased: {
          id: payment.id,
          status: payment.status,
          data: payment.date_created,
          totalOrder: parseFloat((amount-(amount*(configs.percentPixOff/100))).toFixed(2)),
          url: payment.point_of_interaction.transaction_data.ticket_url,
          methodPayment: dataCollection.productsInCart.methodPayment,
          products: dataCollection.productsInCart.products
        } } }
      )

      res.status(200).json({url: payment.point_of_interaction.transaction_data.ticket_url})
    } else if (cartUser.methodPayment === "bolbradesco") {

      const payment = await getPayment(amount, "test", cartUser.methodPayment)

      collectionUsers.updateOne(
        { _id: new ObjectId(token) },
        { $addToSet: { itemsPurchased: {
          id: payment.id,
          status: payment.status,
          data: payment.date_created,
          totalOrder: amount,
          url: payment.transaction_details.external_resource_url,
          methodPayment: dataCollection.productsInCart.methodPayment,
          products: dataCollection.productsInCart.products
        } } }
      )

      res.status(200).json({url: payment.transaction_details.external_resource_url})
    }

    collectionUsers.updateOne(
      { _id: new ObjectId(token) },
      { $set: { productsInCart: {
        methodPayment: "pending",
        products: []
      } } }
    )
  }
}
