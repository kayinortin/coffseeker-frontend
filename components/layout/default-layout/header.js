import React from 'react'
import Image from 'next/image'

export default function Header() {
  return (
    <>
      <header className="ed-bg-setting fixed-top">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="d-flex align-items-center mobile-justify-content-center">
                <a href="http://localhost:3000">
                  <Image
                    src="http://localhost:3000/coffseeker-logo-desktop.png"
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
