import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Card from '@/components/news/card'
import CategoryBtn from '@/components/news/category-btn'
import OrderBy from '@/components/news/order-by'
import Pagination from '@/components/news/pagination'

export default function News() {
  const [currentSort, setCurrentSort] = useState('default')
  const [selectedCategory, setSelectedCategory] = useState('allnews')
  const [newsData, setNewsData] = useState([]) // 儲存新聞數據
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6 // 每頁顯示的資料數量

  const fetchNewsData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3005/api/news?sortBy=${currentSort}&page=${currentPage}&itemsPerPage=${itemsPerPage}`
      )

      if (response.ok) {
        const jsonData = await response.json()
        setNewsData(jsonData.news) // 更新新聞數據
        setTotalPages(jsonData.totalPages) // 更新總頁數
      } else {
        console.error('API請求失敗')
      }
    } catch (error) {
      console.error('API請求失敗:', error)
    }
  }

  useEffect(() => {
    fetchNewsData()
  }, [currentSort, currentPage])

  const handleSortChange = (newSort) => {
    setCurrentSort(newSort)
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
  }

  const handlePageChange = (page) => {
    // console.log('Page changed to:', page)
    setCurrentPage(page)
  }

  // console.log('currentPage 值：', currentPage)
  // console.log('totalPages 值：', totalPages)

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
          <div className="container d-block ed-index-course mb-4">
          <div className="line-white"></div>
          <div className="course-category">最新消息</div>
          <div className="line-white"></div>
        </div>

          {/* 篩選&排序區 */}
          <div className="d-md-flex align-items-end justify-content-center mb-lg-4">
            <div className="me-lg-4">
              <CategoryBtn onSelectCategory={handleCategoryChange} />
            </div>
            <div className="mobile-orderby d-flex flex-column align-items-center ms-lg-4 mt-md-1">
              <OrderBy onChange={handleSortChange} />
            </div>
          </div>

          {/* 渲染新聞列表 */}
          <Card
            newsData={newsData}
            currentPage={currentPage}
            totalPages={totalPages}
          />
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
