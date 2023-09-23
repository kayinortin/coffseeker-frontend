import React from 'react'
import Image from 'next/image'
import { LiaUserAltSolid, LiaShoppingBagSolid } from 'react-icons/lia'

export default function Header() {
  return (
    <>
      <header className="ed-bg-setting fixed-top">
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
                <a href="http://localhost:3000/member">
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
