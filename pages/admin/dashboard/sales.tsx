import Header from '@/contexts/header'
import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { parseCookies } from 'nookies'

export default function Home({token, purchased}: any) {

  return (
    <>
      <Head>
        <title>Influencial Shop</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <div className={styles.containerQueue}>
        <div className={styles.purchased}>
          <ul>
            {purchased.map((user: any, index: any)=>{
              return (
                <li key={index}>
                  <h5>{user.userItems}</h5>
                  <button onClick={((event:any)=>{
                    const description = event.currentTarget.parentElement.parentElement.querySelector('#descriptionQueue')
                    
                    if(description.style.display === 'none') {
                      description?.setAttribute('style','display: block;')
                    } else {
                      description?.setAttribute('style','display: none;')
                    }
                    })}>Visualisar Pedidos</button>
                  <ul id="descriptionQueue" style={{display: "none"}}>
                    <label>Pedidos</label>
                    {user.listItems.map((purchased: any, index: any) => {
                      return (
                        <li key={index}>
                          <div>
                            Numero do Pedido: #{purchased.id}
                          </div>
                          <div>
                            Status: {purchased.status}
                          </div>
                          <div>
                            Data: { new Date(purchased.data).toLocaleString() }
                          </div>
                          <div>
                            Pagamento: {(purchased.methodPayment).toUpperCase()}
                          </div>
                          <div>
                            Endereco: {`${purchased.saveAddress.address} ${purchased.saveAddress.number} ${purchased.saveAddress.instructions} ${purchased.saveAddress.neighborhood} ${purchased.saveAddress.city} ${purchased.saveAddress.state} ${purchased.saveAddress.zipCode}`}
                          </div>
                          <div>
                            Codigo do Produto: {purchased.code}
                          </div>
                          <div>
                            Produtos:
                            <ul>
                              {purchased.products.map((product: any,index: any) =>{
                                return (
                                  <li key={index}>
                                    <img src={ product.Image }></img>
                                    <div>{product?.Title}</div>
                                    <div>Preco: {(product.Price).toLocaleString('pt-br',{style: 'currency', currency: token.currency})}</div>
                                    <div>Url Provedor: {}</div>
                                  </li>
                                )
                              })} 
                            </ul>
                          </div>
                          <div>
                            Desconto: -{((purchased.products?.reduce((a: any,v: any) =>  a = a + v.Price , 0))-purchased?.totalOrder).toLocaleString(token.languages,{style: 'currency', currency: token.currency})}
                          </div>
                          <div>
                            Total Pedido: {(purchased.totalOrder).toLocaleString(token.languages,{style: 'currency', currency: token.currency})}
                          </div>
                          <button>Editar</button>
                          <button>Excluir</button>
                        </li>
                      )
                    })}
                  </ul>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </>
  )
}

Home.getInitialProps = async (ctx: any) => {

  const { 'infshop.token': token } = parseCookies(ctx)
  const host: any = process.env.HOST_API_URL
  
  if (token) {
    
    const User = await fetch(`${host}/api/auth/recovery/token`,
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({ token: token })
    })
    const { user } = await User.json()

    const purchasedFetch = await fetch(`${host}/api/admin/queuePurchased`)
    const purchased = await purchasedFetch.json()

    return {
      token: user,
      purchased: purchased
    }
  }
}
