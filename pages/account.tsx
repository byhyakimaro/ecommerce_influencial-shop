import Head from 'next/head'
import Header from '@/contexts/header'
import Footer from '@/contexts/footer'

import styles from '@/styles/Home.module.css'
import { parseCookies } from 'nookies'

export default function Home({ user, purchased }: any) {

  const address = JSON.parse(user?.savedAddresses[0])
  const addressFormatted = `${address.road} ${address.number} ${address.complement} ${address.neighborhood} ${address.city} ${address.state} ${address.zipCode}`

  return (
    <>
      <Head>
        <title>Influencial Shop</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <ul>
      <h3>Meus Pedidos</h3>
      { purchased.map((purchasedItem:any, index: any)=>{
        return (
          <li key={index}>
            <div className={styles.tabPurchased}>
              <div className={styles.paymentsPurchased}>
                <div>Numero do pedido: <br></br><br></br>#{ purchasedItem.id }</div>
                <div>Status: <br></br><br></br>{ purchasedItem.status }</div>
                <div>{ new Date(purchasedItem.data).toLocaleDateString() }</div>
                <div>
                  <p>Pagamento<br></br><br></br></p>
                  {purchasedItem.status === "pending" ?
                    <a className={styles.methodPayment} href={ purchasedItem.url } target="_black">{ (purchasedItem.methodPayment).toUpperCase() }</a>
                  : <a>{ (purchasedItem.methodPayment).toUpperCase() }</a>
                  }
                </div>
                <button onClick={((event:any)=>{
                  const description = event.currentTarget.parentElement.parentElement.querySelector('#descriptionPurchased')
                  
                  if(description.style.display === 'none') {
                    description?.setAttribute('style','display: block;')
                  } else {
                    description?.setAttribute('style','display: none;')
                  }
                  })}>Detalhes do pedido</button>
              </div>
              <div style={{display:"none;"}} id="descriptionPurchased" className={styles.descriptionPurchased}>
                <div>
                  <h4>ENDERECO<br></br></h4>
                  <div>{addressFormatted}</div>
                </div>
                <div>
                  <h4>STATUS DO PEDIDO</h4>
                  <div>{ "Aguardando Pagamento" }</div>
                </div>
                <div className={styles.listProducts}>
                  <h4>PRODUTO(S)</h4>
                  <div className={styles.listDescription}>
                    {purchasedItem.products.map((product:any, index: any)=>{
                      return (
                        <>
                          <img src={ product.Image }></img>
                          <div>{product?.Title}</div>
                          <div>Preco: {(product.Price).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</div>
                        </>
                      )
                    })}
                  </div>
                  {purchasedItem.status !== "cancelled" && 
                  <label>
                      <a href="#">Acompanhar Pedido</a>
                      <br></br>
                      { purchasedItem.code }
                  </label>}
                </div>
                <div className={styles.Titles}>
                  <h4 style={{color:"#1f9050;"}}>Desconto : -{((purchasedItem.products?.reduce((a: any,v: any) =>  a = a + v.Price , 0))-purchasedItem?.totalOrder).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</h4>
                  <div className="break"></div>
                  <h4>Total do Pedido: {(purchasedItem.totalOrder).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</h4>
                </div>
              </div>
            </div>
          </li>
        )
      })}
      </ul>
      <Footer></Footer>
    </>
  )
}

Home.getInitialProps = async (ctx: any) => {

  const { 'infshop.token': token } = parseCookies(ctx)
  
  const purchased = await fetch(`http://localhost:3000/api/products/listpurchased`,
  {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({ token: token })
  })
  const itemsPurchased = await purchased.json()

  const User = await fetch(`http://localhost:3000/api/auth/recovery/token`,
  {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({ token: token })
  })
  const { user } = await User.json()

  return {
    user: user,
    purchased: itemsPurchased
  }
}
