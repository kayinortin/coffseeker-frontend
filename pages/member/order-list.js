import React from 'react'
import Link from 'next/link'
import MemSideBar from '@/components/member/Sidebar/MemSideBar'
import OrderListTable from '@/components/member/OrderListTable/Index'
export default function info() {
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
                <Link href="/" className={'link'}>
                  會員中心
                </Link>
              </li>
              <li className={'breadcrumb-item'}>歷史訂單</li>
            </ol>
          </nav>
          <div className={'col-12 col-lg-9'}>
            <div className={'container'}>
              <div className={'position-relative'}>
                <select className={'position-absolute end-0'}>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
              </div>
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
              <OrderListTable />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
