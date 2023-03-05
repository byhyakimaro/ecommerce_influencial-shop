import styles from '@/styles/Home.module.css'
import IconPix from '@/public/icon_pix.svg'

export default function TypePayments() {
  return (
    <>
      <div className={ styles.containerTypePayments }>
        <h2>Formas de Pagamento</h2>
        <div className={ styles.typesPayments }>
          <button>Cartao de Credito</button>
          <IconPix></IconPix><button>PIX</button>
          <button>Boleto</button>
        </div>
      </div>
    </>
  )
}
