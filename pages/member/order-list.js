import React, { useState } from 'react'
import Link from 'next/link'
import MemSideBar from '@/components/member/Sidebar/MemSideBar'
import OrderListTable from '@/components/member/OrderListTable/Index'
export default function OrderList() {
  const [orderBy, setOrderBy] = useState('DESC')
  return (
    <>
      <div className={'container'}>
        {/* 麵包屑 */}
        <div className={'row'}>
          <nav className={'col-lg-3 nav-breadcrumb'}>
            <ol className={'breadcrumb my-3'}>
              <li className={'breadcrumb-item'}>
                <Link href="/" className={'link'}>
                  首頁
                </Link>
              </li>
              <li className={'breadcrumb-item'}>
                <Link href="/member" className={'link'}>
                  會員中心
                </Link>
              </li>
              <li className={'breadcrumb-item'}>歷史訂單</li>
            </ol>
          </nav>
          <div className={'col-12 col-lg-9'}>
            <div
              className={
                'container h-100 d-lg-flex justify-content-end align-items-center'
              }
            >
              <select
                className={'ed-select-control order-select my-2 my-lg-0'}
                onChange={(e) => {
                  setOrderBy(e.target.value)
                  console.log(orderBy)
                }}
              >
                <option value={'DESC'}>時間:新到舊</option>
                <option value={'ASC'}>時間:舊到新</option>
              </select>
            </div>
          </div>
        </div>
        {/* 麵包屑結束 */}

        <div className={'row'}>
          <div className={'col-lg-3 d-none d-lg-block'}>
            <MemSideBar />
          </div>
          <div className={'col-12 col-lg-9 mb-5'}>
            <div className={'container d-flex mb-5'}>
              <OrderListTable orderBy={orderBy} setOrderBy={setOrderBy} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
