/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Navbar from './navbar'

export default function Header() {
  const currentRoute = '/product'
  return (
    <>
      <header style={{ backgroundColor: '#F2F3EE', height: '63px' }}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <img
                src="../coffseeker-logo-desktop.png"
                alt="logo"
                width={258}
                height={58}
              />
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
