import { getCollection } from '@/modules/connectDb'
import type { NextApiRequest, NextApiResponse } from 'next'
import * as dotenv from "dotenv"
import { ObjectId } from 'mongodb'

dotenv.config({ path: __dirname+'/.env' })

const methodFilter:any = {
  pix: 'transaction_data',
  bolbradesco: 'transaction_details'
}

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

  const collectionUsers = await getCollection('users')
  const dataCollection = await collectionUsers.findOne({ _id: new ObjectId(token)})

  const cartUser = dataCollection.productsInCart

  if (cartUser.checkout === "success") {
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

    const payment = await getPayment(amount, "teste", cartUser.methodPayment)

    res.status(200).json(payment[methodFilter[cartUser.methodPayment]])
  }
}
