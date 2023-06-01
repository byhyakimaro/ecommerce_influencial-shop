import '@/styles/globals.css'
import * as dotenv from "dotenv"
import { AuthProvider } from '@/contexts/AuthContexts'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}
