import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { LiaUserAltSolid, LiaShoppingBagSolid } from 'react-icons/lia'
import { checkLoginStatus } from '@/components/member/CheckLoginStaus'

export default function Header() {
  const currentRoute = '/product'
  return (
    <>
      <header className="ed-bg-setting fixed-top">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div
                className="d-flex align-items-center"
                style={{ height: '90px' }}
              >
                <a href="/">
                  <img
                    src="../coffseeker-logo-desktop.png"
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
