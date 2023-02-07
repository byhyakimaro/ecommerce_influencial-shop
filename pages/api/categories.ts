import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuid } from 'uuid'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json([
    {
      name : "Ofertas e Descontos",
      img : "https://cf.shopee.com.br/file/705d0a6c7170e82703fc519a9ad590ff_tn"
    },
    {
      name : "Automotivo",
      img : "https://cf.shopee.com.br/file/705d0a6c7170e82703fc519a9ad590ff_tn"
    },
    {
      name : "Moda e Beleza",
      img : "https://cf.shopee.com.br/file/705d0a6c7170e82703fc519a9ad590ff_tn"
    },
    {
      name : "Casa e Construcao",
      img : "https://cf.shopee.com.br/file/705d0a6c7170e82703fc519a9ad590ff_tn"
    },
    {
      name : "Saude e Cuidados Pessoais",
      img : "https://cf.shopee.com.br/file/705d0a6c7170e82703fc519a9ad590ff_tn"
    },
    {
      name : "Alimentos e Bebidas",
      img : "https://cf.shopee.com.br/file/705d0a6c7170e82703fc519a9ad590ff_tn"
    },
    {
      name : "Eletronicos e Dispositivos",
      img : "https://cf.shopee.com.br/file/705d0a6c7170e82703fc519a9ad590ff_tn"
    },
    {
      name : "Escritorio e Home Office",
      img : "https://cf.shopee.com.br/file/705d0a6c7170e82703fc519a9ad590ff_tn"
    },
    {
      name : "Livros e Ebook",
      img : "https://cf.shopee.com.br/file/705d0a6c7170e82703fc519a9ad590ff_tn"
    },
    {
      name : "Brinquedos e itens para criancas e bebes",
      img : "https://cf.shopee.com.br/file/705d0a6c7170e82703fc519a9ad590ff_tn"
    },
    {
      name : "Video, Musica e Games",
      img : "https://cf.shopee.com.br/file/705d0a6c7170e82703fc519a9ad590ff_tn"
    },
    {
      name : "Esportes, Aventura e Lazer",
      img : "https://cf.shopee.com.br/file/705d0a6c7170e82703fc519a9ad590ff_tn"
    },
    {
      name : "Presentes",
      img : "https://cf.shopee.com.br/file/705d0a6c7170e82703fc519a9ad590ff_tn"
    },
  ])
}
