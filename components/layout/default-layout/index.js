import React, { useEffect } from 'react'
import Head from 'next/head'
// import Header from './header'
// import Navbar from './navbar'
import Footer from './footer'
import ParentComponent from './ParentDropdown'

export default function DefaultLayout({ title = '', children }) {
  // 使header與nav在滾動時增加淡出效果
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
      {/* <Header />
      <Navbar /> */}
      <ParentComponent />
      <div id="main-content">{children}</div>
      <Footer />
    </>
  )
}
