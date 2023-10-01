import { useEffect } from 'react'
import '../index.scss'
import DefaultLayout from '@/components/layout/default-layout/index'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap')
  }, [])

  // 使用預設排版檔案 components/layout/default-layout/index.js`
  const getLayout =
    Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>)

  return getLayout(<Component {...pageProps} />)
}
