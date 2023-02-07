import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuid } from 'uuid'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json([
    {
      Title: "Apple Iphone 13 (128 GB) Meia-Noite",
      Code: 902384409,
      Image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-card-40-iphone14pro-202209_FMT_WHH?wid=508&hei=472&fmt=p-jpg&qlt=95&.v=1663611329204",
      Price: 4.928,
      Evaluation : 4.3,
      CountEvaluation : 323
    }
  ])
}
