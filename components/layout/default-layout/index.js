// import MyNavbar from './my-navbar-nouse'
import Navbar from './navbar'
import Footer from './footer'
import Head from 'next/head'
import Header from './header'
// import NextBreadCrumb from '@/components/common/next-breadcrumb'

export default function DefaultLayout({ title = '', children }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width" />
      </Head>
      <Header></Header>
      <Navbar />
      <main className="">
        {/* <NextBreadCrumb isHomeIcon isChevron bgClass="" /> */}
        {children}
      </main>
      <Footer />
    </>
  )
}
