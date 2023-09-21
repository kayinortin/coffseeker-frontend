import React from 'react'
import Link from 'next/link'
import Card from '@/components/news/card' //卡片
import CategoryBtn from '@/components/news/category-btn'

export default function News() {
  return (
    <main>
      <section className="background">
        <div className={'container'}>
          {/* 麵包屑*/}
          <div className={'row ms-4 mt-1'}>
            <nav className={'nav-breadcrumb'}>
              <ol className={'breadcrumb m-3'}>
                <li className={'breadcrumb-item'}>
                  <Link href="/" className="link ">
                    首頁
                  </Link>
                </li>
                <Link
                  href="/news"
                  className="breadcrumb-item text-decoration-none"
                >
                  最新消息
                </Link>
              </ol>
            </nav>
          </div>

          {/* 標題區 */}
          <div className="d-flex justify-content-center mb-2">
            <h4 className="text-center me-3">—————</h4>
            <h4 className="text-center news-title">最新消息</h4>
            <h4 className="text-center ms-3">—————</h4>
          </div>
          <CategoryBtn />
          <Card />
        </div>
      </section>
    </main>
  )
}
