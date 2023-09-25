<<<<<<< HEAD
=======
import React, { useEffect } from 'react'
>>>>>>> upstream/dev
import Head from 'next/head'
import Header from './header'
import Navbar from './navbar'
import Footer from './footer'

export default function DefaultLayout({ title = '', children }) {
  useEffect(() => {
    const handleScroll = () => {
      const scrollAmount = window.scrollY
      const elements = document.querySelectorAll('header, nav')

      if (scrollAmount > 50) {
        elements.forEach(function (el) {
          el.classList.add('fade-out')
        })
      } else {
        elements.forEach(function (el) {
          el.classList.remove('fade-out')
        })
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
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
