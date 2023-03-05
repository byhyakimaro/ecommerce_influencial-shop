import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { parseCookies } from 'nookies'
import { GetStaticPaths } from 'next'
import Image from 'next/image'
import Header from '@/contexts/header'
import Footer from '@/contexts/footer'
import TypePayments from '@/contexts/typePayments'

export default function Home({ product }: any) {

  return (
    <>
      <Head>
        <title>Influencial Shop</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <div className={ styles.containerProduct }>
        <h1 className={ styles.Title } > { product.Title } </h1>
        <div className={styles.containerItem}>
          <div className={ styles.containerImage }>
            <div className={ styles.Evaluation }> { product.Evaluation } / 5 - ({ product.CountEvaluation })</div>
            <Image src={ product.Image } alt={''} width={250} height={330}></Image>
          </div>
          <div className={ styles.containerDescription }>
            <div> Vendido e Entregue Por<strong>{ "Amazon" }</strong> | { "Em Estoque" } </div>
            <div className={ styles.Price } > R$ { product.Price } </div>
            <div>À vista no PIX com até 10% OFF</div>
            <button>Ver mais Opcoes de Pagamento</button>
            <div className={ styles.buyBottom }>
              <a href={ `../checkout/${ product.Code }` }>
                <button name="buy">Compre Agora</button>
              </a>
            </div>
            <div>Fabricante: Apple</div>
          </div>
        </div>
      </div>
      <Footer></Footer>
      <TypePayments></TypePayments>
    </>
  )
}

Home.getInitialProps = async (ctx: any) => {

  const { 'infshop.token': token } = parseCookies(ctx)
  const { product: productId } = ctx.query

  fetch(`http://${ctx.req?.headers.host}/api/products/countproduct`,
  {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({
        token,
        itemCode: productId
      })
  })

  const product = await fetch(`http://${ctx.req?.headers.host}/api/products/${productId}`)

  if (product.status === 200) {
    return {
      product: await product.json()
    }
  }
}

const getStaticPaths: GetStaticPaths = async () => {
  

  return {
    paths: [],
    fallback: false
  }
}