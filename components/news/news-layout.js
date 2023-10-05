import React from 'react'
import Link from 'next/link'

export default function NewsLayout() {
  return (
    <>
      {' '}
      <div className="ei-news-container">
        {/* 麵包屑 */}
        <div className="row">
          <nav className="nav-breadcrumb ms-3 d-none d-sm-block">
            <ol className="ei-breadcrumb m-3 list-inline">
              <li className="breadcrumb-item list-inline-item">
                <Link href="/" className="link">
                  首頁
                </Link>
              </li>
              <li className="breadcrumb-item list-inline-item">
                <Link
                  href="/news"
                  className="breadcrumb-item text-decoration-none link ms-2"
                >
                  最新消息
                </Link>
              </li>
            </ol>
          </nav>
        </div>

        {/* 標題區 */}
        <div className="d-flex justify-content-center mb-4 align-items-center mobile-news-title">
          <div className="ei-line me-3"></div>
          <h3 className="text-center news-title fs-2">最新消息</h3>
          <div className="ei-line ms-3"></div>
        </div>
      </div>
    </>
  )
}
