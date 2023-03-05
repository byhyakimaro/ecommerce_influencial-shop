import styles from '@/styles/Home.module.css'
import PixSVG from '@/public/icon_pix.svg'
import CreditCardSVG from '@/public/credit-card.svg'
import BarCodeSVG from '@/public/bar-code.svg'

export default function TypePayments() {
  
  function switchCase(event:any) {
    event.currentTarget.parentElement.parentElement?.setAttribute("style", "display: none;")
  }

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
      <div className={ styles.containerTypePayments }>
        <h2>Formas de Pagamento <button onClick={switchCase}>X</button></h2>
        <div className={ styles.typesPayments }>
          <div className={ styles.typesTab }>
            <button value="credit" onClick={changeButton}><CreditCardSVG width={24} height={24} value="show"></CreditCardSVG><div>Cartao de Credito</div></button>
            <button value="pix" onClick={changeButton}><PixSVG width={24} height={24} value="hidden"></PixSVG><div>PIX</div></button>
            <button value="barcode" onClick={changeButton}><BarCodeSVG width={24} height={24} value="hidden"></BarCodeSVG><div>Boleto</div></button>
          </div>
          <div className={ styles.containerTypes }>
            <div data-type="credit" style={{ display:"flex" }} className={ styles.tabCreditCard }>
              <div>Ate 12x Sem Juros! e a 1x com 5% de Desconto</div>
            </div>
            <div data-type="pix" style={{ display:"none" }} className={ styles.tabPix }>
              <div>Pague com o PIX e priorizamos o despacho em 1 hora!</div>
            </div>
            <div data-type="barcode" style={{ display:"none" }} className={ styles.tabBarCode }>
              <div>O prazo de pagamento via boleto bancário é de 2 dias corridos.</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
