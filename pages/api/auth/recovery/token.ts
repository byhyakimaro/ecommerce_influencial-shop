import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next'

import { getCollection } from '@/modules/connectDb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const { token } = req.body
  
  const collectionConfigs = await getCollection('configs')
  const configs = await collectionConfigs.findOne()

  const collection = await getCollection('users')
  
  const dataCollection = await collection.findOne({ _id: new ObjectId(token)})

  if (dataCollection) {

    const itemsViewedFormatted: any[] = dataCollection.itemsViewed.filter((item: any, 
    index: any) => dataCollection.itemsViewed.indexOf(item) === index)
    
    const productsViewed = await Promise.all(itemsViewedFormatted.map(async (productId:any) =>{
      const product = await fetch(`http://${req?.headers.host}/api/product/${productId}`)
      
      if (product.status === 200) {
        return await product.json()
      }
    }))
    
    const productsInCartFormatted: any[] = dataCollection.productsInCart.products.filter((item: any, 
      index: any) => dataCollection.productsInCart.products.indexOf(item) === index)
    
    const productsInCart = await Promise.all(productsInCartFormatted.map(async (productId:any) =>{
      const product = await fetch(`http://${req?.headers.host}/api/product/${productId}`)

      if (product.status === 200) {
        return await product.json()
      }
    }))

    res.status(200).json({
      token: dataCollection["_id"],
      offers: { percentPixOff: dataCollection.offers.percentPixOff },
      user: {
        name: dataCollection.name,
        login: dataCollection.login,
        currency: dataCollection.currency,
        email: dataCollection.email,
        savedAddresses: dataCollection.savedAddresses,
        telephone: dataCollection.telephone,
        avatarUrl: dataCollection.avatarUrl,
        itemsViewed: productsViewed.filter(function( element ) { return element !== undefined }),
        productsInCart: productsInCart.filter(function( element ) { return element !== undefined })
      }
    })
  } else {
    res.status(404).json({
      status : 'Not Found'
    })
  }
}
