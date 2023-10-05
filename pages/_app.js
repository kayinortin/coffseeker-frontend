import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import '../index.scss'
import DefaultLayout from '@/components/layout/default-layout/index'
import AOS from 'aos'
import 'aos/dist/aos.css'

import { UserProvider } from '@/context/UserInfo'
import { CartProvider } from '@/context/CartContent'

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap')
  }, [])

  const getLayout =
    Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>)

  // return <UserProvider>{getLayout(<Component {...pageProps} />)}</UserProvider>
  return (
    <>
      <UserProvider>
        <CartProvider>{getLayout(<Component {...pageProps} />)}</CartProvider>
      </UserProvider>
    </>
  )
}
