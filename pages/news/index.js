import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Card from '@/components/news/card'
import CategoryBtn from '@/components/news/category-btn'
import OrderBy from '@/components/news/order-by'
import Pagination from '@/components/news/pagination'

export default function News() {
  const [currentSort, setCurrentSort] = useState('default')
  const [selectedCategory, setSelectedCategory] = useState('allnews')
  const [newsData, setNewsData] = useState([]) // 存儲新聞數據
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)

  const fetchNewsData = async (page) => {
    try {
      const response = await fetch(
        `http://localhost:3005/api/news?page=${page}`
      )
      console.log('API請求URL:', `http://localhost:3005/api/news?page=${page}`)

      if (response.ok) {
        const jsonData = await response.json()
        console.log('API響應數據:', jsonData)
        setNewsData(jsonData.news) // 更新新聞數據
        setTotalPages(jsonData.totalPages)
      } else {
        console.error('API 請求失敗')
      }
    } catch (error) {
      console.error('API 請求失敗:', error)
    }
  }

  const handleSortChange = (newSort) => {
    setCurrentSort(newSort)
  }

  function myOwnSort(sortBy, items) {
    if (sortBy === 'popular') {
      return items.sort((a, b) => b.views - a.views)
    } else if (sortBy === 'oldest') {
      return items.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      )
    } else {
      return items
    }
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
  }
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }
  useEffect(() => {
    fetchNewsData(currentPage)
    console.log(currentPage)
  }, [currentPage])

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
          {/* 篩選&排序區 */}
          <div className="d-md-flex align-items-end justify-content-center mb-lg-4">
            <div className="me-lg-4">
              <CategoryBtn onSelectCategory={handleCategoryChange} />
            </div>
            <div className="mobile-orderby d-flex flex-column align-items-center ms-lg-4 mt-md-1">
              <OrderBy onChange={handleSortChange} onSort={myOwnSort} />
            </div>
          </div>

          {/* 渲染新聞列表 */}
          <Card currentSort={currentSort} newsData={newsData} />
          {/* 分頁 */}
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  )
}
