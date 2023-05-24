import styles from '@/styles/Home.module.css'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '@/contexts/AuthContexts'

export default function Header() {

  const { user, isAuthenticated } = useContext(AuthContext)

  const [i18n, setI18n] = useState<any>()
  const language = isAuthenticated ? user?.language : 'en-us'

  useEffect(() => {

    fetch(`http://localhost:3000/locales/${language}/header.json`)
    .then(response => response.json())
    .then(response => {
      response ? setI18n(response) : null
    })
    
    console.log(user)

  }, [user])

  return (
    <>
     <header className={styles.header}>
        <a href=".."><div className={styles.logotype}></div></a>
        <div className={styles.navbar}>
          <input type="text" className={styles.bartext} placeholder={i18n?.bartext}></input>
          <div className={styles.searchbar} onClick={((event:any)=>{
            const searchText = event.currentTarget.parentElement.firstChild.value
            
            if (searchText) {
              event.currentTarget.parentElement.firstChild.value = ''
              window.location.href = `/search/${searchText}`
            }
          })}>
            <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M39.8 41.95 26.65 28.8q-1.5 1.3-3.5 2.025-2 .725-4.25.725-5.4 0-9.15-3.75T6 18.75q0-5.3 3.75-9.05 3.75-3.75 9.1-3.75 5.3 0 9.025 3.75 3.725 3.75 3.725 9.05 0 2.15-.7 4.15-.7 2-2.1 3.75L42 39.75Zm-20.95-13.4q4.05 0 6.9-2.875Q28.6 22.8 28.6 18.75t-2.85-6.925Q22.9 8.95 18.85 8.95q-4.1 0-6.975 2.875T9 18.75q0 4.05 2.875 6.925t6.975 2.875Z"/></svg>
          </div>
        </div>
        <div className={styles.account}>
          <a href={"/login"}>
            <div className={styles.accountname}><b>{ isAuthenticated ? `Ola, ${(user?.name)?.split(' ')[0]}` : i18n?.login }</b></div>
          </a>
          <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M12 15.05 6.35 9.375l1.05-1.05 4.6 4.6 4.6-4.6 1.05 1.05Z"/></svg>
        </div>
        <a href={"/cart"}>
          <div className={styles.cart}>
            <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M14.35 44.25q-1.5 0-2.55-1.05-1.05-1.05-1.05-2.55 0-1.5 1.05-2.55 1.05-1.05 2.55-1.05 1.5 0 2.55 1.075 1.05 1.075 1.05 2.525 0 1.5-1.05 2.55-1.05 1.05-2.55 1.05Zm20 0q-1.5 0-2.55-1.05-1.05-1.05-1.05-2.55 0-1.5 1.05-2.55 1.05-1.05 2.55-1.05 1.5 0 2.55 1.075 1.05 1.075 1.05 2.525 0 1.5-1.05 2.55-1.05 1.05-2.55 1.05Zm-22.05-33 5 10.45h14.3l5.7-10.45Zm-1.85-3.6H39.1q1.5 0 2.3 1.35.8 1.35 0 2.75L35.15 23.1q-.6 1-1.525 1.625-.925.625-2.125.625H16.55l-2.6 4.9h24.3v3.6h-24.4q-2.35 0-3.35-1.575t.05-3.425l3.15-5.75L6.25 7.3h-4V3.7H8.6ZM17.3 21.7h14.3Z"/></svg>
            {i18n?.cart}
          </div>
        </a>
      </header>
      <div className={styles.subHeader}>
        <a>{i18n?.subHeader_0}</a>
        <a>{i18n?.subHeader_1}</a>
        {user?.office === 'owner' && <a href='../admin/dashboard'>ADMIN</a>}
      </div>
    </>
  )
}
