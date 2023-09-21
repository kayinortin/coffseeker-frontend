import React from 'react'
import Link from 'next/link'

export default function SideBar() {
  const sidebar = [
    '會員中心',
    '會員資料查詢/修改',
    '修改密碼',
    '訂單管理',
    '我的收藏',
    '優惠券',
    '登出',
  ]
  return (
    <>
      <div className={'sidebar d-flex flex-column'}>
        {sidebar.map((list) => {
          return (
            <>
              <div className={'border-bottom p-2'}>
                <Link href="/" className={'sidebar-title'}>
                  {list}
                </Link>
              </div>
            </>
          )
        })}
      </div>
    </>
  )
}
