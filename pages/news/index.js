import React from 'react'
import Link from 'next/link'
import Card from '@/components/news/card'
import CategoryBtn from '@/components/news/category-btn'
import styles from '../../styles/_news.module.scss'
import OrderBy from '@/components/news/order-by'
import Pagination from '@/components/news/pagination'
import { useState } from 'react'

export default function News() {
  const [currentSort, setCurrentSort] = useState('default')
  const [selectedCategory, setSelectedCategory] = useState('allnews') // 初始選擇全部消息

  // 定義處理排序方式變化的函數
  const handleSortChange = (newSort) => {
    setCurrentSort(newSort) // 更新 currentSort 狀態
  }

  function myOwnSort(sortBy, items) {
    if (sortBy === 'popular') {
      // 根據最多人瀏覽排序
      return items.sort((a, b) => b.views - a.views)
    } else if (sortBy === 'oldest') {
      // 根據日期排序
      return items.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      )
    } else {
      // 預設排序方式
      return items
    }
  }

  // 定義處理分類變化的函數
  const handleCategoryChange = (category) => {
    setSelectedCategory(category) // 更新 selectedCategory 狀態
  }

  return (
    <>
      <div className="">
        <div className="container">
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
          <div className="d-md-flex align-items-end justify-content-center mb-lg-4">
            <div className="me-lg-4">
              <CategoryBtn onSelectCategory={handleCategoryChange} />
            </div>
            <div className="mobile-orderby d-flex flex-column align-items-center ms-lg-4 mt-md-1">
              <OrderBy onChange={handleSortChange} onSort={myOwnSort} />
            </div>
          </div>

          {/* 渲染新聞列表 */}
          <Card currentSort={currentSort} />

          <Pagination />
        </div>
      </div>
    </>
  )
}
