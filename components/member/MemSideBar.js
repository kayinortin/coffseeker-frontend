import React from 'react'
import Link from 'next/link'

export default function MemSideBar() {
  const sidebar = [
    {
      id: 1,
      option: '會員中心',
      href: '/member/',
    },
    {
      id: 2,
      option: '訂單管理',
      href: '/member/order-list',
    },
    {
      id: 3,
      option: '我的收藏',
      href: '/member/likes',
    },
    {
      id: 4,
      option: '優惠券',
      href: '/member/coupon',
    },
    {
      id: 5,
      option: '登出',
      href: '/member/login',
    },
  ]
  return (
    <>
      <div className={'d-flex flex-column'}>
        {sidebar.map((v) => {
          return (
            <div className={'border-bottom p-2'} key={v.id}>
              <Link href={v.href} className={'sidebar-title'}>
                {v.option}
              </Link>
            </div>
          )
        })}
      </div>
    </>
  )
}
