import Head from 'next/head'
import Header from '@/contexts/header'
import { useRouter } from 'next/router';
import Footer from '@/contexts/footer'

import styles from '@/styles/Home.module.css'
import { parseCookies } from 'nookies';

export default function Home({ token }: any) {
  const router = useRouter()

  async function handleDelete() {

    if (router.query.delete) {
      const Address = await fetch(`/api/account/deleteaddress`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ token: token, Index: router.query.delete })
      })
      await Address.json()
    }

    window.location.href = '/account'
  }

  return (
    <>
      <Head>
        <title>Influencial Shop</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <a href='..'>Voltar</a>
      <button onClick={handleDelete}>Confirmar exclusão</button>
      <Footer></Footer>
    </>
  )
}


Home.getInitialProps = async (ctx: any) => {
  const { 'infshop.token': token } = parseCookies(ctx)
   
  return { token }
}
