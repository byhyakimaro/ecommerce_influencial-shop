import { getCollection } from '@/modules/connectDb'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const collection = await getCollection('products')
  const products = await collection.find().toArray()

  const collectionCategories = await getCollection('categories')
  const categories = await collectionCategories.find().toArray()

  const MaxItemsReturned = 20
  const MaxItemsOffersReturned = 1

  products.sort((a: any, b: any) => b.dateProduct.getTime() - a.dateProduct.getTime())
  const productRecentFormat = products.filter((product :any) =>{
    return product.active
  }).slice(0, MaxItemsReturned).map((product: any) => {
    const off = product.offersPercentage > 0 && product.offersPercentage

    return {
      Title: product.Title,
      Code: product["_id"].toString(),
      Image: product.Images[0],
      Price: (product.Price+product.Price*(product.gainPercentage/100))-(product.Price*(product.offersPercentage/100)),
      Off: off && off,
      CountEvaluation: product.CountEvaluation
    }
  })

  products.sort((a: any, b: any) => b.quantitySold - a.quantitySold)
  const productSoldFormat = products.filter((product :any) =>{
    return product.active
  }).slice(0, MaxItemsReturned).map((product: any) => {
    const off = product.offersPercentage > 0 && product.offersPercentage

    return {
      Title: product.Title,
      Code: product["_id"].toString(),
      Image: product.Images[0],
      Price: (product.Price+product.Price*(product.gainPercentage/100))-(product.Price*(product.offersPercentage/100)),
      Off: off && off,
      CountEvaluation: product.CountEvaluation
    }
  })

  products.sort(() => Math.random() - 0.5)
  const productRecommendedFormat = products.filter((product :any) =>{
    return product.active
  }).slice(0, MaxItemsReturned).map((product: any) => {
    const off = product.offersPercentage > 0 && product.offersPercentage

    return {
      Title: product.Title,
      Code: product["_id"].toString(),
      Image: product.Images[0],
      Price: (product.Price+product.Price*(product.gainPercentage/100))-(product.Price*(product.offersPercentage/100)),
      Off: off && off,
      CountEvaluation: product.CountEvaluation
    }
  })
  
  products.sort((a: any,b :any) => b.offersPercentage - a.offersPercentage)
  const productOffersFormat = products.slice(0, MaxItemsOffersReturned).map((product: any) => {
    const off = product.offersPercentage > 0 && product.offersPercentage

    return {
      Title: product.Title,
      Code: product["_id"].toString(),
      Category: product.category,
      Image: product.Images[0],
      Price: (product.Price+product.Price*(product.gainPercentage/100))-(product.Price*(product.offersPercentage/100)),
      Off: off && off,
      CountEvaluation: product.CountEvaluation
    }
  })

  const categorySelected = categories[Math.floor(Math.random() * (categories.length - 1) + 1)]
  const productsRandomCategory = products.filter((product :any) =>{ 
    return product.category === categorySelected.code 
  }).slice(0, MaxItemsReturned).map((product: any) => {
    const off = product.offersPercentage > 0 && product.offersPercentage

    return {
      Title: product.Title,
      Code: product["_id"].toString(),
      Image: product.Images[0],
      Price: (product.Price+product.Price*(product.gainPercentage/100))-(product.Price*(product.offersPercentage/100)),
      Off: off && off,
      CountEvaluation: product.CountEvaluation
    }
  })

  res.status(200).json({
    randomCategory: productsRandomCategory,
    recentProducts: productRecentFormat,
    bestSell: productSoldFormat,
    recommended: productRecommendedFormat,
    topDeal: productOffersFormat
  })
}
