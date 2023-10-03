import React from 'react'
import Link from 'next/link'
import MemSideBar from '@/components/member/MemSideBar'
import InfoChangeForm from '@/components/member/InfoChangeForm'
export default function info() {
  return (
    <>
      <section className={'background'}>
        <div className={'container'}>
          {/* 麵包屑 */}
          <div className={'row'}>
            <nav className={'nav-breadcrumb'}>
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
                <li className={'breadcrumb-item'}>會員資料檢視</li>
              </ol>
            </nav>
          </div>
          {/* 麵包屑結束 */}

          <div className={'row'}>
            <div className={'col-3'}>
              <MemSideBar />
            </div>
            <div className={'col-9 mb-5'}>
              <div className={'px-5'}>
                <InfoChangeForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
