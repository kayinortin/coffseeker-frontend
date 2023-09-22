import React from 'react'

export default function Header() {
  return (
    <>
      <header className="ed-bg-setting fixed-top">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="d-flex align-items-center mobile-justify-content-center">
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
