import styles from '@/styles/Home.module.css'
import PixSVG from '@/public/icon_pix.svg'
import CreditCardSVG from '@/public/credit-card.svg'
import BarCodeSVG from '@/public/bar-code.svg'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '@/contexts/AuthContexts'

export default function TypePayments({showComponent}:any) {
  
  const { user, isAuthenticated } = useContext(AuthContext)
  const [showComponents, setShowComponent] = useState(showComponent)

  const [i18n, setI18n] = useState<any>()
  const language = isAuthenticated ? user?.language : 'en-us'
  
  useEffect(() => {
    setShowComponent(showComponent)
  }, [showComponent])

  useEffect(() => {
    showComponents ? document.getElementById('containerTypePayments')?.setAttribute("style", "display: block;") : document.getElementById('containerTypePayments')?.setAttribute("style", "display: none;")
  }, [showComponents])

  useEffect(() => {

    fetch(`http://localhost:3000/locales/${language}/typePayments.json`)
    .then(response => response.json())
    .then(response => {
      response ? setI18n(response) : null
    })
    
  }, [user])

  function changeButton(event:any){

    const value = event.currentTarget.value

    event.currentTarget.parentElement.childNodes.forEach((element:any) =>{
      element.firstChild.setAttribute("value", "hidden")
    })
    event.currentTarget.firstChild.setAttribute("value", "show")

    const ArrayFather: any = document.querySelector(`div[data-type="${value}"]`)?.parentElement?.childNodes
    ArrayFather?.forEach((element:any) =>{
      element?.setAttribute("style", "display: none;")
    })

    document.querySelector(`div[data-type="${value}"]`)?.setAttribute("style", "display: flex;")
  }
  
  return (
    <>
      <div className={ styles.containerTypePayments } id='containerTypePayments'>
        <h2>{i18n?.typePayments}<button onClick={() => setShowComponent(false)}>X</button></h2>
        <div className={ styles.typesPayments }>
          <div className={ styles.typesTab }>
            <button value="credit" onClick={changeButton}><CreditCardSVG width={24} height={24} value="show"></CreditCardSVG><div>{i18n?.creditTitle}</div></button>
            <button value="pix" onClick={changeButton}><PixSVG width={24} height={24} value="hidden"></PixSVG><div>{i18n?.pixTitle}</div></button>
            <button value="barcode" onClick={changeButton}><BarCodeSVG width={24} height={24} value="hidden"></BarCodeSVG><div>{i18n?.barcodeTitle}</div></button>
          </div>
          <div className={ styles.containerTypes }>
            <div data-type="credit" style={{ display:"flex" }} className={ styles.tabCreditCard }>
              <div>{i18n?.creditText}</div>
            </div>
            <div data-type="pix" style={{ display:"none" }} className={ styles.tabPix }>
              <div>{i18n?.pixText}</div>
            </div>
            <div data-type="barcode" style={{ display:"none" }} className={ styles.tabBarCode }>
              <div>{i18n?.barcodeText}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
