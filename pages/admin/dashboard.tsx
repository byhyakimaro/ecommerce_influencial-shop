import Head from 'next/head'
import { useForm } from 'react-hook-form'

export default function Home() {
  const { register, handleSubmit } = useForm()

  async function handleRegister(data: any) {
    
    console.log(data)

  }

  return (
    <>
      <Head>
        <title>Influencial Shop</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <form onSubmit={handleSubmit(handleRegister)}>
        <div>Title</div>
        <input
        {...register('Title')} 
        ></input>

        <div>Image</div>
        <input
        {...register('Image')} 
        ></input>

        <div>productStock</div>
        <input
        {...register('productStock')} 
        ></input>

        <div>Price</div>
        <input 
        {...register('Price')}
        ></input>

        <div>loginCreateItem</div>
        <input
        {...register('loginCreateItem')} 
        ></input>

        <div>category</div>
        <input
        {...register('category')} 
        ></input>

        <div>active</div>
        <input
        {...register('active')} 
        ></input>
        
        <div>urlProvider</div>
        <input
        {...register('urlProvider')} 
        ></input>

        <button type="submit">Register Item</button>
      </form>
    </>
  )
}
