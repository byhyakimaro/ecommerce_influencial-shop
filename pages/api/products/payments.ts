import { getCollection } from '@/modules/connectDb'
import type { NextApiRequest, NextApiResponse } from 'next'
import * as dotenv from "dotenv"

dotenv.config({ path: __dirname+'/.env' })


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { amount, description, method } = req.body

  fetch('https://api.mercadopago.com/v1/payments',{
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
  .then(response => response.json())
  .then(response => {
    res.status(200).json(response)
  })
}
