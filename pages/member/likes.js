import React from 'react'
import Link from 'next/link'
import MemSideBar from '@/components/member/Sidebar/MemSideBar'
import Favorite from '@/components/member/Favorite/Index'
import Head from 'next/head'
export default function info() {
  return (
    <>
      <div>
        <Head>
          <title>會員中心｜探索咖啡COFFSEEKER</title>
        </Head>
      </div>
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
                <Link href="/member" className={'link'}>
                  會員中心
                </Link>
              </li>
              <li className={'breadcrumb-item'}>我的收藏</li>
            </ol>
          </nav>
        </div>
        {/* 麵包屑結束 */}

        <div className={'row'}>
          <div className={'col-lg-3 d-none d-lg-block'}>
            <MemSideBar />
          </div>
          <div className={'col-12 col-lg-9 mb-5'}>
            <div className={'container d-flex mb-5'}>
              <Favorite />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
