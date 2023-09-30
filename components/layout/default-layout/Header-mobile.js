import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function HeaderMobile(props) {
  const { navItems, currentRoute, navActions, isTop, isFullScreen } = props

  const router = useRouter()
  const { pathname } = router

  const [check, setCheck] = useState(false)
  useEffect(() => {
    setCheck(false)
  }, [pathname])

  return (
    <>
      <div className="ed-navbar--mobile d-flex d-lg-none">
        <input
          type="checkbox"
          id="menuToggle"
          className="ed-navbar__check"
          checked={check}
          onChange={() => {
            setCheck(!check)
          }}
        />
        <label htmlFor="menuToggle" className="ed-navbar__toggle">
          <i className="fas fa-bars ed-navbar__icon"></i>
        </label>
        <Link
          className="ed-navbar__font ed-navbar__logo"
          href="http://localhost:3000/"
        >
          {!isTop || isFullScreen ? (
            <img src="/logo-white.png" alt="logo" />
          ) : (
            <img src="/logo-dark.png" alt="logo" />
          )}
        </Link>
        <div className={`ed-navbar__menu ${!isTop ? 'ed-navbar--scroll' : ''}`}>
          <ul className="ed-navbar__list">
            {navItems.map((item) => {
              if (!item.children) {
                return (
                  // 沒有下拉式選單的情況
                  <li className="ed-navbar__item" key={item.id}>
                    <a
                      className={`ed-navbar__font ${
                        navItems.find((here) => here.href === currentRoute)
                          ? 'active'
                          : ''
                      }`}
                      aria-current="page"
                      href={item.href}
                    >
                      <h4 className="ed-navbar__font">{item.label}</h4>
                    </a>
                  </li>
                )
              }
              // 有下拉式選單 (children) 的情況
              return (
                <li className="nav-item dropdown" key={item.id}>
                  <input
                    type="checkbox"
                    id={`toggle-${item.id}`}
                    style={{ display: 'none' }}
                  />
                  <label
                    htmlFor={`toggle-${item.id}`}
                    className={`nav-link ed-navbar__font ${
                      item.children.find((child) => child.href === currentRoute)
                        ? 'active'
                        : ''
                    }`}
                  >
                    <h4 className="ed-navbar__font">{item.label}</h4>
                  </label>
                  <ul className="expandable-menu">
                    {item.children.map((child) => (
                      <li key={child.id}>
                        <a
                          className={`dropdown-item ed-navbar__font ${
                            currentRoute === child.href ? 'active' : ''
                          }`}
                          href={child.href}
                        >
                          {child.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              )
            })}

            <li className="ed-navbar__item">
              <hr className="ed-hr ed-hr--navbar" />
            </li>

            {navActions.map((action) => (
              <li className="ed-navbar__item" key={action.id}>
                <Link href={action.href} className="ed-navbar__btn">
                  {action.iconMobile}
                  <h4 className="ed-navbar__font">{action.label}</h4>
                </Link>
              </li>
            ))}
            {/* {!isLogin ? null : (
                    <li className="ed-navbar__item d-flex logout-icon">
                      <i
                        className="fas fa-sign-out-alt ed-navbar__font"
                        onClick={handleLogout}
                      ></i>
                      <h4 className="ed-navbar__font">登出</h4>
                    </li>
                  )} */}
          </ul>
        </div>
      </div>
    </>
  )
}
