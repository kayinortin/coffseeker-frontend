import React from 'react'
import Dropdown from './dropdown'
import Data from '@/data/dropdown/menuItems.json'

export default function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-sm bg-transparent navbar-light bg-dark fixed-top z-1080">
        <div className="container-fluid">
          {/* 手機板的情況下，收合為漢堡選單 */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {/* 電腦版的情況下，展開導覽列表 */}
          <Dropdown items={Data}/>
        </div>
      </nav>
    </>
  )
}
