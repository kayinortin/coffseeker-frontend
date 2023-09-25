// import MemberShipButton from '@/components/member/MemberShipButton'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { LiaUserAltSolid, LiaShoppingBagSolid } from 'react-icons/lia'
import { checkLoginStatus } from '@/components/member/CheckLoginStaus'

export default function Header() {
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
      <header className="ed-bg-setting fixed-top z-1031">
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
                <a
                  href={
                    isLoggedIn
                      ? 'http://localhost:3000/member'
                      : 'http://localhost:3000/member/login'
                  }
                >
                  <LiaUserAltSolid className="ed-icon-user" />
                </a>
                <a href="http://localhost:3000/cart">
                  <LiaShoppingBagSolid className="ed-icon-cart" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
