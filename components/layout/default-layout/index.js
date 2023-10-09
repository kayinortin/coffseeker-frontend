import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Head from 'next/head'
import HeaderDesktop from './Header-desktop'
import HeaderMobile from './Header-mobile'
import Footer from './footer'

import { checkLoginStatus } from '@/components/member/FetchDatas/CheckLoginStaus'
import { useUser } from '@/context/UserInfo'
import { useCartList } from '@/context/cart'

// Navbar 電腦版資料
import navItems from '../../../data/navitems.json'
// Navbar 手機版資料
import navItemsForMobile from '../../../data/navForMobile.json'

export default function DefaultLayout({ title = '', children }) {
  // 取得當前路由
  const router = useRouter()
  const currentRoute = router.asPath
  const isHome = router.pathname === '/'
  const isMap = router.pathname === '/map'
  const isDivination = router.pathname === '/infomation/divination'
  const isLogin = router.pathname === '/member/login'
  const isAdmin = router.pathname.startsWith('/admin')
  const isWildcard = router.pathname === '*'
  // 最後再按照需求來設定 isFullScreen
  const isFullScreen = isLogin || isAdmin || isWildcard || isMap || isDivination

  // 滾動特效
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isTop, setIsTop] = useState(false)
  const handleScroll = () => {
    const position = window.pageYOffset
    setScrollPosition(position)
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  useEffect(() => {
    if (!isHome && scrollPosition <= 300) {
      setIsTop(true)
    } else if (isHome && scrollPosition <= 700) {
      setIsTop(true)
    } else {
      setIsTop(false)
    }
  }, [scrollPosition])

  const [cartIconLength, setCartIconLength] = useState(0)
  const { cartListData, setCartListData } = useCartList()

  useEffect(() => {
    const storedCartData = JSON.parse(localStorage.getItem('cartList'))
    if (storedCartData) {
      setCartListData(storedCartData)
      setCartIconLength(storedCartData.length)
    }
  }, [])

  useEffect(() => {
    if (cartListData) {
      setCartIconLength(cartListData.length)
    }
  }, [cartListData])

  // 未登入狀態

  // Navbar 右側按鈕資料
  const navActionsVisitor = [
    {
      id: 7,
      label: '註冊/登入',
      iconMobile: (
        <i className="fas fa-user-circle ed-navbar__font ed-navbar__icon ed-navbar__icon--inline"></i>
      ),
      iconDesktop: <i className="fas user-circle ed-navbar__font"></i>,
      tagDesktop: ``,
      href: '/member/login',
    },
    {
      id: 10,
      label: '收藏清單',
      iconMobile: (
        <i className="fas fa-heart ed-navbar__font ed-navbar__icon ed-navbar__icon--inline"></i>
      ),
      iconDesktop: <i className="fas fa-heart ed-navbar__font"></i>,
      tagDesktop: ``,
      href: '/fav',
    },
    {
      id: 11,
      label: '購物車',
      iconMobile: (
        <i className="fas fa-shopping-cart ed-navbar__font ed-navbar__icon ed-navbar__icon--inline"></i>
      ),
      iconDesktop: <i className="fas fa-shopping-cart ed-navbar__font"></i>,
      tagDesktop: <div className="ed-tag ed-tag--corner">{cartIconLength}</div>,
      href: '/cart',
    },
  ]
  const navActionsLogin = [
    {
      id: 8,
      label: '會員中心',
      iconMobile: (
        <i className="fas fa-user ed-navbar__font ed-navbar__icon ed-navbar__icon--inline"></i>
      ),
      iconDesktop: <i className="fas fa-user ed-navbar__font"></i>,
      tagDesktop: ``,
      href: '/member',
    },
    {
      id: 9,
      label: '優惠券',
      iconMobile: (
        <i className="fas fa-ticket-alt ed-navbar__font ed-navbar__icon ed-navbar__icon--inline"></i>
      ),
      iconDesktop: <i className="fas fa-ticket-alt ed-navbar__font"></i>,
      tagDesktop: ``,
      href: '/member/coupon',
    },
    {
      id: 10,
      label: '收藏清單',
      iconMobile: (
        <i className="fas fa-heart ed-navbar__font ed-navbar__icon ed-navbar__icon--inline"></i>
      ),
      iconDesktop: <i className="fas fa-heart ed-navbar__font"></i>,
      tagDesktop: ``,
      href: '/fav',
    },
    {
      id: 11,
      label: '購物車',
      iconMobile: (
        <i className="fas fa-shopping-cart ed-navbar__font ed-navbar__icon ed-navbar__icon--inline"></i>
      ),
      iconDesktop: <i className="fas fa-shopping-cart ed-navbar__font"></i>,
      tagDesktop: <div className="ed-tag ed-tag--corner">{cartIconLength}</div>,
      href: '/cart',
    },
  ]

  // cookies 設定
  const { isLoggedIn, setIsLoggedIn } = useUser()
  useEffect(() => {
    async function fetchLoginStatus() {
      const loggedIn = await checkLoginStatus()
      setIsLoggedIn(loggedIn)
    }

    fetchLoginStatus()
  }, [isLoggedIn, setIsLoggedIn])

  return (
    <>
      <Head />
      <header
        className={`ed-navbar sticky-top ${
          !isTop || isFullScreen ? 'ed-navbar--scroll' : ''
        }`}
      >
        <div className="container h-100">
          <nav className="ed-navbar__wrapper justify-content-center justify-content-lg-between">
            <HeaderDesktop
              navItems={navItems}
              currentRoute={currentRoute}
              navActions={!isLoggedIn ? navActionsVisitor : navActionsLogin}
              isTop={isTop}
              isFullScreen={isFullScreen}
            />
            <HeaderMobile
              navItems={navItemsForMobile}
              currentRoute={currentRoute}
              navActions={!isLoggedIn ? navActionsVisitor : navActionsLogin}
              isTop={isTop}
              isFullScreen={isFullScreen}
            />
          </nav>
        </div>
      </header>
      {children}
      <Footer />
    </>
  )
}
