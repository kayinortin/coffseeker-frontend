import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { LiaUserAltSolid, LiaShoppingBagSolid } from 'react-icons/lia'
import { checkLoginStatus } from '@/components/member/CheckLoginStaus'
import { useRouter } from 'next/router'
import Link from 'next/link'

const items = [
  {
    id: 1,
    children: [
      { id: 11, label: '會員中心', href: '/member' },
      { id: 12, label: '會員資料檢視/修改', href: '/member/info' },
      { id: 13, label: '修改密碼', href: '/member/change-password' },
      { id: 14, label: '訂單管理', href: '/member/order-list' },
      { id: 15, label: '我的收藏', href: '/member/likes' },
      { id: 16, label: '優惠券', href: '/member/coupon' },
      { id: 17, label: '登出', href: '/member/login' },
    ],
  },
]

export default function Header({ isOpen, toggleDrop, currentDropdown }) {
  const router = useRouter()
  const currentRoute = router.pathname
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  // useEffect(() => {
  //   async function fetchLoginStatus() {
  //     const loggedIn = await checkLoginStatus()
  //     setIsLoggedIn(loggedIn)
  //   }

  //   fetchLoginStatus()
  // }, [])

  const children = items[0].children

  return (
    <>
      <header className="ed-bg-setting fixed-top z-1060">
        <div className="container">
          <div className="row">
            <div className="d-flex col-12 justify-content-md-between justify-content-end">
              <div className="d-flex align-items-center mobile-justify-content-center">
                <a href="http://localhost:3000">
                  <Image
                    src="http://localhost:3000/coffseeker-logo-desktop.png"
                    alt="logo"
                    width={258}
                    height={58}
                    className="smaller-Logo"
                  />
                </a>
              </div>
              <div className="d-flex align-items-center ed-icon-padding">
                <button
                  className="ed-icon-user-button"
                  onClick={() => {
                    if (isLoggedIn) {
                      if (currentDropdown !== 'navbar') {
                        toggleDrop()
                      }
                      // toggleDrop()
                      // setShowOverlay((prev) => !prev)
                    } else {
                      window.location.href =
                        'http://localhost:3000/member/login'
                    }
                  }}
                >
                  <LiaUserAltSolid className="ed-icon-user" />
                </button>
                {isOpen && (
                  <ul className="ed-reset slideIn">
                    {children.map((v) => {
                      return (
                        <li key={v.id}>
                          <Link
                            className={`dropdown-item ${
                              currentRoute === v.href ? 'active' : ''
                            }`}
                            href={v.href}
                            onClick={toggleDrop}
                          >
                            {v.label}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                )}
                <Link href="http://localhost:3000/cart">
                  <LiaShoppingBagSolid className="ed-icon-cart" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
