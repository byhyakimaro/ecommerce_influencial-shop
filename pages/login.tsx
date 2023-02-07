import Head from 'next/head'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../contexts/AuthContexts'
import styles from '@/styles/Home.module.css'

export default function Home() {
  const { register, handleSubmit } = useForm()
  const { signIn } = useContext(AuthContext)

  async function handleSignIn(data: any) {
    await signIn(data)
  }

  return (
    <div >
      <Head>
        <title>Home</title>
      </Head>

      <div className={styles.loginContainer}>
        <form className={styles.loginForm} onSubmit={handleSubmit(handleSignIn)}>
          <div className={styles.loginTitle} >
            <h2 >Sign in to your account</h2>
          </div>
          <input type="hidden" name="remember" defaultValue="true" />
          <div >
            <div>
              <label htmlFor="email-address">
                Email address
              </label>
              <input
                {...register('email')}
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" >
                Password
              </label>
              <input
                {...register('password')}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Password"
              />
            </div>
          </div>

          <div >
            <div className="text-sm">
              <a href="#">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}