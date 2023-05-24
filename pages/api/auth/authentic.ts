import type { NextApiRequest, NextApiResponse } from 'next'
import { compareSync } from 'bcrypt'

import { getCollection } from '@/modules/connectDb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const { email , password } = req.body

  const collection = await getCollection('users')

  const dataCollection = await collection.findOne({ email: email })

  if (compareSync(password ,dataCollection.password)) {
    res.status(200).json({
      token: dataCollection["_id"],
      user: {
        name: dataCollection.name,
        login: dataCollection.login,
        office: dataCollection.office,
        email: email,
        telephone: dataCollection.telephone,
        avatarUrl: dataCollection.avatarUrl,
        itemsViewed: dataCollection.itemsViewed
      }
    })
  }
}
