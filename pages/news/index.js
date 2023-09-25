import React from 'react'
import Link from 'next/link'
import Card from '@/components/news/card'
import CategoryBtn from '@/components/news/category-btn'
import styles from '../../styles/_news.module.scss'

export default function News() {
  return (
    <main>
      <section className="background">
        <div className="container">
          {/* 麵包屑 */}
          <div className="row ms-4 mt-1 mt-3">
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
          <div className="d-flex justify-content-center mb-2 align-items-center">
            <div className="ei-line me-3"></div>
            <h3 className="text-center news-title">最新消息</h3>
            <div className="ei-line ms-3"></div>
          </div>

          <div className="">
            <CategoryBtn className="" />
          </div>
          <Card />
        </div>
      </section>
    </main>
  )
}
