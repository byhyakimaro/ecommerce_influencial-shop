import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuid } from 'uuid'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json([
    {
      name : "Ofertas e Descontos",
      code: "electronics-devices",
      img : "https://cf.shopee.com.br/file/705d0a6c7170e82703fc519a9ad590ff_tn"
    },
    {
      name : "Automotivo",
      code: "electronics-devices",
      img : "https://cf.shopee.com.br/file/705d0a6c7170e82703fc519a9ad590ff_tn"
    },
    {
      name : "Moda e Beleza",
      code: "electronics-devices",
      img : "https://cf.shopee.com.br/file/705d0a6c7170e82703fc519a9ad590ff_tn"
    },
    {
      name : "Casa e Construcao",
      code: "electronics-devices",
      img : "https://cf.shopee.com.br/file/705d0a6c7170e82703fc519a9ad590ff_tn"
    },
    {
      name : "Saude e Cuidados Pessoais",
      img : "https://cf.shopee.com.br/file/705d0a6c7170e82703fc519a9ad590ff_tn"
    },
    {
      name : "Alimentos e Bebidas",
      code: "food-drinks",
      img : "https://cf.shopee.com.br/file/705d0a6c7170e82703fc519a9ad590ff_tn"
    },
    {
      name : "Eletronicos e Dispositivos",
      code: "electronics-devices",
      img : "https://cf.shopee.com.br/file/705d0a6c7170e82703fc519a9ad590ff_tn"
    },
    {
      name : "Escritorio e Home Office",
      code: "home-office",
      img : "https://cf.shopee.com.br/file/705d0a6c7170e82703fc519a9ad590ff_tn"
    },
    {
      name : "Livros e Ebook",
      code: "books-ebook",
      img : "https://cf.shopee.com.br/file/705d0a6c7170e82703fc519a9ad590ff_tn"
    },
    {
      name : "Brinquedos e itens para criancas e bebes",
      code: "toys-children-babies",
      img : "https://cf.shopee.com.br/file/705d0a6c7170e82703fc519a9ad590ff_tn"
    },
    {
      name : "Video, Musica e Games",
      code: "video-music-games",
      img : "https://cf.shopee.com.br/file/705d0a6c7170e82703fc519a9ad590ff_tn"
    },
    {
      name : "Esportes, Aventura e Lazer",
      code: "electronics-devices",
      img : "https://cf.shopee.com.br/file/705d0a6c7170e82703fc519a9ad590ff_tn"
    },
    {
      name : "Presentes",
      code: "electronics-devices",
      img : "https://cf.shopee.com.br/file/705d0a6c7170e82703fc519a9ad590ff_tn"
    },
  ])
}
