import React from 'react'
import MemberShipButton from '@/components/member/MemberShipButton'

export default function Header() {
  return (
    <>
      <header className="ed-bg-setting fixed-top z-1031">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="d-flex align-items-center mobile-justify-content-center justify-content-between">
                <a href="http://localhost:3000">
                  <img
                    src="../coffseeker-logo-desktop.png"
                    alt="logo"
                    width={258}
                    height={58}
                  />
                </a>
                <div>
                  <MemberShipButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
