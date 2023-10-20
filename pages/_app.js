import { useEffect } from 'react'
import '../index.scss'
import DefaultLayout from '@/components/layout/default-layout/index'

import AOS from 'aos'
import 'aos/dist/aos.css'

import { AuthProviderJWT } from '@/context/useAuthJWT'
import { UserProvider } from '@/context/UserInfo'
import { ProductsProvider } from '@/context/product'
import { CategoryProvider } from '@/context/category'
import { CartListProvider } from '@/context/cart'
import { CartListCourseProvider } from '@/context/cart_course'
import { FavProvider } from '@/context/fav'
import { DetailProvider } from '@/context/showProductDetail'
import { CommentProvider } from '@/context/comment'
import { CoursesProvider } from '@/context/course'
import { PaginationProvider } from '@/context/pagination'

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap')
  }, [])

  const getLayout =
    Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>)

  return (
    <>
      <AuthProviderJWT>
        <UserProvider>
          <PaginationProvider>
            <DetailProvider>
              <ProductsProvider>
                <CoursesProvider>
                  <CartListProvider>
                    <CartListCourseProvider>
                      <FavProvider>
                        <CategoryProvider>
                          <CommentProvider>
                            {getLayout(<Component {...pageProps} />)}
                          </CommentProvider>
                        </CategoryProvider>
                      </FavProvider>
                    </CartListCourseProvider>
                  </CartListProvider>
                </CoursesProvider>
              </ProductsProvider>
            </DetailProvider>
          </PaginationProvider>
        </UserProvider>
      </AuthProviderJWT>
    </>
  )
}
