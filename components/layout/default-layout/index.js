import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Head from 'next/head'
import HeaderDesktop from './Header-desktop'
import HeaderMobile from './Header-mobile'
import Footer from './footer'

import { checkLoginStatus } from '@/components/member/CheckLoginStaus'
import axios from 'axios'
import { useLogin } from '@/context/LoginStatus'
import Swal from 'sweetalert2'

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

  // 導覽區塊(電腦版)
  const navItems = [
    {
      id: 1,
      label: '線上購物',
      children: [
        { id: 11, label: '全站商品', href: '/product' },
        { id: 12, label: '咖啡球', href: '/product/category/01' },
        { id: 13, label: '濾掛包', href: '/product/category/02' },
        { id: 14, label: '咖啡豆', href: '/product/category/03' },
        { id: 15, label: '中淺焙 > 偏酸', href: '/product/category/04' },
        { id: 16, label: '中　焙 > 不酸不苦', href: '/product/category/05' },
        { id: 17, label: '中深焙 > 偏苦', href: '/product/category/06' },
        { id: 18, label: '企業團購', href: '/product/category/07' },
        { id: 19, label: '送禮推薦', href: '/product/category/08' },
      ],
    },
    {
      id: 2,
      label: '咖啡資訊',
      children: [
        { id: 21, label: '咖啡占卜', href: '/infomation/divination' },
        { id: 22, label: '烘焙介紹', href: '/infomation/baked' },
        { id: 23, label: '手沖資訊', href: '/infomation/handbrewed' },
      ],
    },
    {
      id: 3,
      label: '咖啡地圖',
      href: '/map',
    },
    {
      id: 4,
      label: '課程預約',
      href: '/course',
    },
    {
      id: 5,
      label: '最新消息',
      href: '/news',
    },
    {
      id: 6,
      label: '關於我們',
      href: '/about',
    },
  ]
  // 導覽區塊(手機版)
  const navItemsForMobile = [
    {
      id: 1,
      label: '線上購物',
      href: '/product',
    },
    {
      id: 2,
      label: '咖啡資訊',
      children: [
        { id: 21, label: '咖啡占卜', href: '/infomation/divination' },
        { id: 22, label: '烘焙介紹', href: '/infomation/baked' },
        { id: 23, label: '手沖資訊', href: '/infomation/handbrewed' },
      ],
    },
    {
      id: 3,
      label: '咖啡地圖',
      href: '/map',
    },
    {
      id: 4,
      label: '課程預約',
      href: '/course',
    },
    {
      id: 5,
      label: '最新消息',
      href: '/news',
    },
    {
      id: 6,
      label: '關於我們',
      href: '/about',
    },
  ]

  //   const { cartListData } = useCartList()
  //   const [cartIconLength, setCartIconLength] = useState()
  //   useEffect(() => {
  //     setCartIconLength(cartListData.length)
  //   }, [cartListData])

  // 未登入狀態
  const navActionsVisitor = [
    {
      id: 7,
      label: '註冊/登入',
      iconMobile: (
        <i className="fas fa-user-circle ed-navbar__font led-navbar__icon ed-navbar__icon--inline"></i>
      ),
      iconDesktop: <i className="fas user-circle ed-navbar__font"></i>,
      tagDesktop: ``,
      href: 'member/login',
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
      tagDesktop: <div className="ed-tag ed-tag--corner"></div>,
      href: '/cart',
    },
  ]
  // 登入狀態
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
      tagDesktop: <div className="ed-tag ed-tag--corner"></div>,
      href: '/cart',
    },
  ]
  // cookies 設定
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => {
    async function fetchLoginStatus() {
      const loggedIn = await checkLoginStatus()
      setIsLoggedIn(loggedIn)
    }

    fetchLoginStatus()
  }, [])

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
      {/* <div id="main-content"> */}
      {children}
      {/* </div> */}
      <Footer />
    </>
  )
}
