import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import MegaMenu from './mega-menu'

const menuItems = [
  {
    id: 1,
    label: '線上購物',
    href: '/product',
    children: [
      { id: 11, label: '全站商品', href: '/product/' },
      { id: 12, label: '咖啡球', href: '/product/01' },
      { id: 13, label: '濾掛包', href: '/product/02' },
      { id: 14, label: '咖啡豆', href: '/product/03' },
      { id: 15, label: '中淺焙 > 偏酸', href: '/product/04' },
      { id: 16, label: '中　焙 > 不酸不苦', href: '/product/05' },
      { id: 17, label: '中深焙 > 偏苦', href: '/product/06' },
      { id: 18, label: '企業團購', href: '/product/07' },
      { id: 19, label: '送禮推薦', href: '/product/08' },
    ],
  },
  {
    id: 2,
    label: '咖啡資訊',
    href: '/infomation',
    children: [
      { id: 21, label: '咖啡占卜', href: '/infomation/divination' },
      { id: 22, label: '烘焙介紹', href: '/infomation/baked' },
      { id: 23, label: '手沖資訊', href: '/infomation/handbrewed' },
    ],
  },
  {
    id: 3,
    label: '咖啡地圖',
    href: '/map',
  },
  {
    id: 4,
    label: '課程預約',
    href: '/course',
  },
  {
    id: 5,
    label: '最新消息',
    href: '/news',
  },
  {
    id: 6,
    label: '關於我們',
    href: '/about',
  },
]

export default function Navbar(currentRoute) {
  return (
    <>
      <nav
        className={`navbar navbar-expand-lg bg-transparent navbar-light bg-dark fixed-top`}
      >
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse`} id="navbarNav">
            <ul className="navbar-nav">
              {menuItems.map((v) => {
                if (!v.children) {
                  return (
                    <li className="nav-item ed-padding-x" key={v.id}>
                      <Link
                        className={`nav-link ${
                          currentRoute === v.href ? 'active ' : ''
                        }`}
                        aria-current="page"
                        href={v.href}
                      >
                        {v.label}
                      </Link>
                    </li>
                  )
                }

                // 以下為有下拉選單的選單項目
                return (
                  <li className={`nav-item dropdown ed-padding-x`} key={v.id}>
                    <Link
                      className={`nav-link dropdown-toggle ${
                        v.children.find((v) => v.href === currentRoute)
                          ? 'active '
                          : ''
                      }`}
                      href={v.href}
                      role="button"
                      data-bs-toggle="dropdown"
                    >
                      {v.label}
                    </Link>
                    <ul className={`dropdown-menu `}>
                      {v.children.map((v2) => {
                        return (
                          <li key={v2.id}>
                            <Link
                              className={`dropdown-item ${
                                currentRoute === v2.href ? 'active' : ''
                              }`}
                              href={v2.href}
                            >
                              {v2.label}
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  </li>
                )
              })}
              <MegaMenu currentRoute={currentRoute} />
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
