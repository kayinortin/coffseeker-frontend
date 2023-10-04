import { useState, useEffect } from 'react'
import '../index.scss'
import DefaultLayout from '@/components/layout/default-layout/index'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { UserProvider } from '@/context/UserInfo'
import { ProductsProvider } from '@/context/product'
import { CategoryProvider } from '@/context/category'
import { CartListProvider } from '@/context/cart'
import { FavProvider } from '@/context/favorite'

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap')
  }, [])

  const getLayout =
    Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>)

  return (
    <UserProvider>
      <ProductsProvider>
        <CartListProvider>
          <FavProvider>
            <CategoryProvider>
              {getLayout(<Component {...pageProps} />)}
            </CategoryProvider>
          </FavProvider>
        </CartListProvider>
      </ProductsProvider>
    </UserProvider>
  )
}
