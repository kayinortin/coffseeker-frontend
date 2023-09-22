/* eslint-disable @next/next/no-img-element */
import React from 'react'

export default function Header() {
  return (
    <>
      <header style={{ backgroundColor: '#F2F3EE', height: '90px' }}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div
                className="d-flex align-items-center"
                style={{ height: '90px' }}
              >
                <a href="http://localhost:3000">
                  <img
                    src="../coffseeker-logo-desktop.png"
                    alt="logo"
                    width={258}
                    height={58}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
