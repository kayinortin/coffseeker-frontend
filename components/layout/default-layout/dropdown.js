import React, { useState } from 'react'
import { useRouter } from 'next/router'

export default function Dropdown({ items }) {
  const router = useRouter()
  const currentRoute = router.asPath
  // console.log('currentRoute:', currentRoute);

  const [dropdownOpen, setDropdownOpen] = useState(false)
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }
  return (
    <>
      <div
        className="collapse navbar-collapse justify-content-center"
        id="offcanvasNavbar"
      >
        <ul className="navbar-nav slideIn">
          {items.map((v) => {
            // 沒有下拉選單的選單項目
            if (!v.children) {
              return (
                <li className="nav-item ed-padding-x" key={v.id}>
                  <a
                    className={`nav-link ed-bar`}
                    aria-current="page"
                    href={v.href}
                  >
                    {v.label}
                  </a>
                </li>
              )
            }

            // 有下拉選單的選單項目
            return (
              <li className={`nav-item dropdown ed-padding-x`} key={v.id}>
                <a
                  className={`nav-link dropdown-toggle ${
                    v.children.find((v) => v.href === currentRoute)
                      ? 'active '
                      : ''
                  }`}
                  href={v.href}
                  role="button"
                  onClick={toggleDropdown}
                >
                  {v.label}
                </a>
                {dropdownOpen && (
                  <ul className="dropdown-menu">
                    {v.children.map((v2) => {
                      // console.log('Current Route:', currentRoute)
                      // console.log('v2.href:', v2.href)
                      return (
                        <li key={v2.id}>
                          <a
                            className={`dropdown-item ${
                              currentRoute === v2.href ? 'active' : ''
                            }`}
                            href={v2.href}
                          >
                            {v2.label}
                          </a>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
