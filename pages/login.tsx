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
        <a href=".."><div className={styles.login_logotype}></div></a>
        <form className={styles.loginForm} onSubmit={handleSubmit(handleSignIn)}>
          <div className={styles.divInputs} >
            <label>Login, Email or Telephone</label>
            <input type="hidden" name="remember" defaultValue="true" />
            <input
                {...register('email')}
                id="email-address"
                className={styles.inputs}
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Email address"
              />
          </div>
          <div className={styles.divInputs} >
            <label>Password</label>
            <input type="hidden" name="remember" defaultValue="true" />
              <input
                {...register('password')}
                id="password"
                className={[styles.inputs, styles.inputPassword].join(" ")}
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Password"
              />
              <a href="#">Forgot your password?</a>
          </div>
          <br></br>
          <button type='submit'>Sign in</button>
        </form>
      </div>
    </div>
  )
}