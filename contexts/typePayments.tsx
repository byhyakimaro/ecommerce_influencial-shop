import styles from '@/styles/Home.module.css'
import PixSVG from '@/public/icon_pix.svg'
import CreditCardSVG from '@/public/credit-card.svg'
import BarCodeSVG from '@/public/bar-code.svg'

export default function TypePayments() {
  return (
    <>
      <div className={ styles.containerTypePayments }>
        <h2>Formas de Pagamento</h2>
        <div className={ styles.typesPayments }>
          <button><CreditCardSVG width={24} height={24}></CreditCardSVG>Cartao de Credito</button>
          <button><PixSVG width={24} height={24}></PixSVG>PIX</button>
          <button><BarCodeSVG width={24} height={24}></BarCodeSVG>Boleto</button>
        </div>
      </div>
    </>
  )
}
