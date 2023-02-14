import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next'

import { getCollection } from '@/modules/connectDb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const { token } = req.body

  const collection = await getCollection('users')

  console.log(req.body)

  const dataCollection = await collection.findOne({ _id: new ObjectId(token)})

  if (dataCollection) {

    const itemsViewedFormatted: any[] = dataCollection.itemsViewed.filter((item: any, 
    index: any) => dataCollection.itemsViewed.indexOf(item) === index)

    const productsViewed = await Promise.all(itemsViewedFormatted.map(async (productId:any) =>{
      const product = await fetch(`http://localhost:3000/api/products/${productId}`)

      return await product.json()
    }))

    res.status(200).json({
      token: dataCollection["_id"],
      user: {
        name: dataCollection.name,
        login: dataCollection.login,
        email: dataCollection.email,
        telephone: dataCollection.telephone,
        avatarUrl: dataCollection.avatarUrl,
        itemsViewed: productsViewed
      }
    })
  } else {
    res.status(404).json({
      status : 'Not Found'
    })
  }
}
