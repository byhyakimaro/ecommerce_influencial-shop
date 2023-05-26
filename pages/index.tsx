import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Header from '@/contexts/header'
import { parseCookies } from 'nookies'
import Footer from '@/contexts/footer'

export default function Home({ data, User, i18n }:any) {

  const language = User?.user?.language ? User?.user?.language : 'en-us'
  const currency = User?.user?.currency ? User?.user?.currency : 'USD'

  function passarItensDir(event: any) {
    const ul = event.currentTarget.parentElement.querySelector('ul')
    let value = parseInt(ul.dataset.transform) + 130

    if (value >= 0) value = 0

    ul.setAttribute('style',`transform: translateX(${ value }px)`)
    ul.setAttribute('data-transform', value)
  }

  function passarItensEsq(event: any) {
    const ul = event.currentTarget.parentElement.querySelector('ul')
    let value = parseInt(ul.dataset.transform) + (-130)

    if (value <= -1180) value = -1180

    ul.setAttribute('style',`transform: translateX(${ value }px)`)
    ul.setAttribute('data-transform', value)
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
      <div className={styles.banner}>
        <div className={styles.carrousel}>
          <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M400 976 0 576l400-400 56 57-343 343 343 343-56 57Z"/></svg>
          <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="m304 974-56-57 343-343-343-343 56-57 400 400-400 400Z"/></svg>
        </div>
        <div className={styles.content}>
          { User?.user?.itemsViewed.length > 0 ?
            <div className={[styles.keepShopping, styles.widgetVertical].join(" ")}>
            <div className={[styles.titleKeepShopping, styles.titleWidgetVertical].join(" ")}>{i18n.keepShopping}</div>
            <div className={[styles.itemsKeepShopping, styles.itemsWidgetVertical].join(" ")}>
              <ul>
                {User?.user.itemsViewed.slice(0, 2).map((itemViewed : any, index: any) => {
                  return (
                    <li key={index}>
                      <a href={`categories/${itemViewed.Category}`}>
                        <img src={itemViewed.Image}></img>
                        <h6>{ i18n[itemViewed.Category] }</h6>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          : 
          <div className={[styles.offerShopping, styles.widgetVertical].join(" ")}>
            <div className={[styles.titleOfferShopping, styles.titleWidgetVertical].join(" ")}>{i18n.topDeal}</div>
            <div className={[styles.itemsOfferShopping, styles.itemsWidgetVertical].join(" ")}>
              <ul>
                {data.topDeal.map((itemOffer : any, index: any) => {
                  return (
                    <li key={index}>
                      <a href={`provider/${itemOffer.Code}`}>
                        <img src={itemOffer.Image}></img>
                        {itemOffer.Off && <h6>- Offer {itemOffer.Off}% OFF</h6>}
                        <h5>{itemOffer.Title}</h5>
                        <h5>{i18n[itemOffer.Category]}</h5>
                      </a>
                    </li>
                  )
                })}
              </ul>
              <a href='#'>{i18n.allDeals}</a>
            </div>
          </div>
          }
          <div className={styles.bannerHotWords}>
            <a>
              <img src="https://cdn-icons-png.flaticon.com/512/726/726476.png"/>
              <label>{i18n['offers-discounts']}</label>
            </a>
          </div>
          <div className={[styles.recommended, styles.widget].join(" ")}>
            <div className={[styles.titleRecommended, styles.titleWidget].join(" ")}>{i18n.recommended}</div>
            <div className={[styles.itemsRecommended, styles.itemsWidget].join(" ")}>
              <svg className={styles.esq} width="50" height="50" onClick={passarItensEsq}>
                <rect x="10" y="10" width="30" height="30" rx="5" fill="#333" />
                <path d="M20 25 L30 20 L30 30 Z" fill="#fff" />
              </svg>
              <ul data-transform={0}>
                {data.recommended.map((recomended: any, index: any) => {
                  return (
                    <li key={index}>
                      <a href={`provider/${recomended.Code}`}>
                        <img src={recomended.Image} ></img>
                        <label>{recomended.Title}</label>
                        <div className={styles.divPrice}>
                          {recomended.Off ? 
                          <div>
                            <label>{recomended.Price.toLocaleString(language, {style: 'currency', currency: currency})} </label>
                            <label>{(recomended.Price-recomended.Price*(recomended.Off/100)).toLocaleString(language, {style: 'currency', currency: currency})}</label>
                          </div>:
                          <label> {(recomended.Price).toLocaleString(language, {style: 'currency', currency: currency})} </label>}
                          {recomended.Off && <h5>- {recomended.Off}% OFF</h5>}
                        </div>
                      </a>
                    </li>
                  )
                })}
              </ul>
              <svg className={styles.dir} width="50" height="50" onClick={passarItensDir}>
                <rect x="10" y="10" width="30" height="30" rx="5" fill="#333" />
                <path d="M20 25 L30 20 L30 30 Z" fill="#fff" />
              </svg>
            </div>
          </div>
          <div className={styles.categories}>
            <div className={styles.titlecategories}>{i18n.categories}</div>
              {data.categories.map((categorie: any, index: any) => {
                return (
                  <a key={index} href={`categories/${categorie.code}`}>
                    <div className={styles.itemcategorie}>
                      <img src={categorie.img}></img>
                      <div className={styles.nameitem}>{i18n[categorie.code]}</div>
                    </div>
                  </a>
                  )
              })}
          </div>
          <div className={[styles.bestSell, styles.widget].join(" ")}>
            <div className={[styles.titleBestSell, styles.titleWidget].join(" ")}>{i18n.bestSell}</div>
            <div className={[styles.itemsBestSell, styles.itemsWidget].join(" ")}>
              <svg className={styles.esq} width="50" height="50" onClick={passarItensEsq}>
                <rect x="10" y="10" width="30" height="30" rx="5" fill="#333" />
                <path d="M20 25 L30 20 L30 30 Z" fill="#fff" />
              </svg>
              <ul data-transform={0}>
                {data.bestSell.map((bestsell: any, index: any) => {
                  return (
                    <li key={index}>
                      <a href={`provider/${bestsell.Code}`}>
                        <img src={bestsell.Image} ></img>
                        <label>{bestsell.Title}</label>
                        <div className={styles.divPrice}>
                          {bestsell.Off ? 
                          <div>
                            <label>{bestsell.Price.toLocaleString(language, {style: 'currency', currency: currency})} </label>
                            <label>{(bestsell.Price-bestsell.Price*(bestsell.Off/100)).toLocaleString(language, {style: 'currency', currency: currency})}</label>
                          </div>:
                          <label> {(bestsell.Price).toLocaleString(language, {style: 'currency', currency: currency})} </label>}
                          {bestsell.Off && <h5>- {bestsell.Off}% OFF</h5>}
                        </div>
                      </a>
                    </li>
                  )
                })}
              </ul>
              <svg className={styles.dir} width="50" height="50" onClick={passarItensDir}>
                <rect x="10" y="10" width="30" height="30" rx="5" fill="#333" />
                <path d="M20 25 L30 20 L30 30 Z" fill="#fff" />
              </svg>
            </div>
          </div>
          <div className={styles.bannerNews}></div>
          <div className={[styles.discoveryDay, styles.widget].join(" ")}>
          <div className={[styles.titleDiscoveryDay, styles.titleWidget].join(" ")}>{i18n.discoveryDay}</div>
            <div className={[styles.itemsDiscoveryDay, styles.itemsWidget].join(" ")}>
              <ul data-transform={0}>
                {data.recentProducts.map((recent : any, index: any) => {
                  return (
                    <li key={index}>
                      <a href={`provider/${recent.Code}`}>
                        <img src={recent.Image} ></img>
                        <label>{recent.Title}</label>
                        <div className={styles.divPrice}>
                          {recent.Off ? 
                          <div>
                            <label>{recent.Price.toLocaleString(language, {style: 'currency', currency: currency})} </label>
                            <label>{(recent.Price-recent.Price*(recent.Off/100)).toLocaleString(language, {style: 'currency', currency: currency})}</label>
                          </div>:
                          <label> {(recent.Price).toLocaleString(language, {style: 'currency', currency: currency})} </label>}
                          {recent.Off && <h5>- {recent.Off}% OFF</h5>}
                        </div>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className={styles.seeMore}>
              <button>Ver Mais..</button>
            </div>
          </div>
          {
          User?.user?.itemsViewed.length > 0 ?
            <div className={[styles.historyView, styles.widget].join(" ")}>
              <div className={[styles.titleHistoryView, styles.titleWidget].join(" ")}>{i18n.historyView}</div>
              <div className={[styles.itemsHistoryView, styles.itemsWidget].join(" ")}>
                <svg className={styles.esq} width="50" height="50" onClick={passarItensEsq}>
                  <rect x="10" y="10" width="30" height="30" rx="5" fill="#333" />
                  <path d="M20 25 L30 20 L30 30 Z" fill="#fff" />
                </svg>
                <ul data-transform={0}>
                {User?.user.itemsViewed.map((itemViewed : any, index: any) => {
                  return (
                    <li key={index}>
                      <a href={`provider/${itemViewed.Code}`}>
                        <img src={itemViewed.Image} ></img>
                        <label>{itemViewed.Title}</label>
                        <div className={styles.divPrice}>
                          {itemViewed.Off ? 
                          <div>
                            <label>{itemViewed.Price.toLocaleString(language, {style: 'currency', currency: currency})} </label>
                            <label>{(itemViewed.Price-itemViewed.Price*(itemViewed.Off/100)).toLocaleString(language, {style: 'currency', currency: currency})}</label>
                          </div>:
                          <label> {(itemViewed.Price).toLocaleString(language, {style: 'currency', currency: currency})} </label>}
                          {itemViewed.Off && <h5>- {itemViewed.Off}% OFF</h5>}
                        </div>
                      </a>
                    </li>
                  )
                })}
                </ul>
                <svg className={styles.dir} width="50" height="50" onClick={passarItensDir}>
                  <rect x="10" y="10" width="30" height="30" rx="5" fill="#333" />
                  <path d="M20 25 L30 20 L30 30 Z" fill="#fff" />
                </svg>
              </div>
            </div>
          : ''
          }
        </div>
        <Footer></Footer>
      </div>
    </>
  )
}

Home.getInitialProps = async (ctx: any) => {
  
  const { host } = ctx.req.headers

  const listProducts = await fetch(`http://${host}/api/products/listproducts`)
  const data: any = await listProducts.json()

  const categories = await fetch(`http://${host}/api/products/categories`)
  data["categories"] = await categories.json()

  const { 'infshop.token': token } = parseCookies(ctx)
    
    const User = await fetch(`http://${host}/api/auth/recovery/token`,
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({ token: token })
    })
    const dataUser = await User.json()

    const language = dataUser?.user?.language ? dataUser?.user?.language : 'en-us'

    const localesFetch = await fetch(`http://${host}/locales/${language}/index.json`)
    const locales = await localesFetch.json()

  return {
    data,
    i18n: locales,
    User: dataUser
  }
}
