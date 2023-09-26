import React, { useState } from 'react'
import { useRouter } from 'next/router'

const items = [
  {
    id: 1,
    label: '線上購物',
    children: [
      { id: 11, label: '全站商品', href: '/product' },
      { id: 12, label: '咖啡球', href: '/product/category/01' },
      { id: 13, label: '濾掛包', href: '/product/category/02' },
      { id: 14, label: '咖啡豆', href: '/product/category/03' },
      { id: 15, label: '中淺焙 > 偏酸', href: '/product/category/04' },
      { id: 16, label: '中　焙 > 不酸不苦', href: '/product/category/05' },
      { id: 17, label: '中深焙 > 偏苦', href: '/product/category/06' },
      { id: 18, label: '企業團購', href: '/product/category/07' },
      { id: 19, label: '送禮推薦', href: '/product/category/08' },
    ],
  },
  {
    id: 2,
    label: '咖啡資訊',
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

export default function Navbar({ isOpen, toggleDrop, currentDropdown }) {
  const router = useRouter()
  const currentRoute = router.asPath

  const [openDropdownId, setOpenDropdownId] = useState(null)

  const toggleLocalDropdown = (id) => {
    if (openDropdownId === id) {
      setOpenDropdownId(null)
    } else {
      setOpenDropdownId(id)
    }
  }

  return (
    <>
      <nav className="navbar navbar-expand-sm bg-transparent navbar-light bg-dark fixed-top z-1080">
        <div className="container-fluid">
          {/* 手機板的情況下，收合為漢堡選單 */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => {
              if (currentDropdown !== 'user') {
                toggleDrop()
              }
            }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {/* 電腦版的情況下，展開導覽列表 */}
          <div
            className={`collapse navbar-collapse justify-content-center ${
              isOpen ? 'show' : ''
            }`}
          >
            <ul className="navbar-nav slideIn">
              {items.map((v) => {
                if (!v.children) {
                  return (
                    <li className="nav-item ed-padding-x" key={v.id}>
                      <a className={`nav-link ed-bar`} href={v.href}>
                        {v.label}
                      </a>
                    </li>
                  )
                }
                return (
                  <li className={`nav-item dropdown ed-padding-x`} key={v.id}>
                    <a
                      className={`nav-link dropdown-toggle ${
                        v.children.find((v) => v.href === currentRoute)
                          ? 'active'
                          : ''
                      }`}
                      href={v.href}
                      role="button"
                      onClick={(e) => {
                        e.preventDefault()
                        toggleLocalDropdown(v.id)
                      }}
                    >
                      {v.label}
                    </a>
                    {openDropdownId === v.id && (
                      <ul className="dropdown-menu">
                        {v.children.map((v2) => (
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
                        ))}
                      </ul>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
