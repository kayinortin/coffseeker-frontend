import React from 'react'
import Link from 'next/link'
import Card from '@/components/news/card' //卡片
import Category from '@/components/news/category'

export default function News() {
  return (
    <div className="container ">
      {/* 麵包屑*/}
      <div className={'row ms-4 mt-1'}>
        <nav className={'nav-breadcrumb'}>
          <ol className={'breadcrumb m-3'}>
            <li className={'breadcrumb-item'}>
              <Link href="/" className={'link'}>
                首頁
              </Link>
            </li>
            <li className={'breadcrumb-item'}>最新消息</li>
          </ol>
        </nav>
      </div>
      <Category />
      {/* 標題區 */}
      <div className="d-flex justify-content-center mb-3">
        <h4 className="text-center me-3">—————</h4>
        <h4 className="text-center">最新消息</h4>
        <h4 className="text-center ms-3">—————</h4>
      </div>
      <Card />
    </div>
  )
}
