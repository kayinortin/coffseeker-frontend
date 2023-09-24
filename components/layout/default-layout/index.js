import Head from 'next/head'
import Header from './header'
import Navbar from './navbar'
import Footer from './footer'

export default function DefaultLayout({ title = '', children }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width" />
      </Head>
      <Header />
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
