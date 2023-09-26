import React from 'react'
import Link from 'next/link'
import MemSideBar from '@/components/member/SideBar'

// 這頁面map後的資料並沒有以key值呈現，因為沒有id，所以會出現警告
// 建議在map後的資料加上id，例如：
// const sidebar = [
//   { id: 1, title: '會員中心' },
//   { id: 2, title: '會員資料查詢/修改' },
//   { id: 3, title: '修改密碼' },
//   { id: 4, title: '訂單管理' },
//   { id: 5, title: '我的收藏' },
//   { id: 6, title: '優惠券' },
//   { id: 7, title: '登出' },
// ]

// 取得資料後，map時加上key值
// {sidebar.map((list) => {
//   return (
//     <div className={'border-bottom p-2'} key={list.id}>
//       <Link href="/" className={'sidebar-title'}>
//         {list.title}...

export default function User() {
  return (
    <>
      <section className={'background'}>
        <div className={'container'}>
          {/* 麵包屑 */}
          <div className={'row'}>
            <nav className={'nav-breadcrumb'}>
              <ol className={'breadcrumb my-3'}>
                <li className={'breadcrumb-item'}>
                  <Link href="http://localhost:3000/" className={'link'}>
                    首頁
                  </Link>
                </li>
                <li className={'breadcrumb-item'}>會員中心</li>
              </ol>
            </nav>
          </div>
          {/* 麵包屑結束 */}

          <div className={'row'}>
            <div className={'col-3'}>
              <MemSideBar />
            </div>
            <div className={'col-9 mb-5'}>
              <div className={'content border border-dark'}>
                <div className={'form-title border-bottom border-dark p-3'}>
                  會員中心
                </div>
                <div className={'px-5'}>
                  <MemSideBar />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
