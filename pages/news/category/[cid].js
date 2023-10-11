import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import styles from '../../../styles/_news.module.scss'
import NewsLayout from '@/components/news/news-layout'
import CategoryBtn from '@/components/news/category-btn'
import OrderBy from '@/components/news/order-by'
import Pagination from '@/components/news/pagination'

const CategoryNews = () => {
  const router = useRouter()
  const { cid } = router.query
  const [currentSort, setCurrentSort] = useState('default')
  const [categoryNews, setCategoryNews] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)

  // 定義函數以發送分類新聞的API請求
  const fetchCategoryNews = (
    cid,
    page,
    setCategoryNews,
    setTotalPages,
    setCurrentPage
  ) => {
    axios
      .get(`http://localhost:3005/api/news/category/${cid}?page=${page}`)
      .then((response) => {
        console.log('API回應:', response.data) // 添加此行以輸出API回應
        setCategoryNews(response.data.news)
        setTotalPages(response.data.totalPages) // 設置總頁數
        setCurrentPage(page) // 更新當前頁碼
      })
      .catch((error) => {
        console.error('請求出錯:', error)
      })
  }

  // 處理排序方式變更，並更新排序方式
  const handleSortChange = (newSort) => {
    setCurrentSort(newSort)
  }

  useEffect(() => {
    if (cid) {
      fetchCategoryNews(cid, currentPage, setCategoryNews, setTotalPages)
    }
  }, [cid, currentPage])

  // 應用排序方式到消息列表
  const sortedCategoryNews = categoryNews.sort((a, b) => {
    if (currentSort === 'popular') {
      return b.views - a.views // 按最多人瀏覽排序
    } else if (currentSort === 'oldest') {
      return new Date(a.created_at) - new Date(b.created_at) // 舊到新
    } else {
      return new Date(b.created_at) - new Date(a.created_at) // 預設新到舊
    }
  })

  const handlePageChange = (page) => {
    // 在這裡觸發分頁變更，並重新載入相應頁面的新聞
    if (cid) {
      setCurrentPage(page) // 更新當前頁碼
      fetchCategoryNews(
        cid,
        page,
        setCategoryNews,
        setTotalPages,
        setCurrentPage
      )
    }
  }

  useEffect(() => {
    // 在此處使用 cid 發送 API 請求以獲取分類新聞
    if (cid) {
      fetchCategoryNews(cid, currentPage)
    }
  }, [cid, currentPage])

  return (
    <>
      <div className="container">
        <NewsLayout />
        <div className="d-md-flex justify-content-center align-items-end mb-lg-4">
          <div className="d-flex flex-column align-items-center me-lg-4">
            <CategoryBtn />
          </div>
          <div className="mt-4 d-flex justify-content-center ms-lg-4">
            <OrderBy onChange={handleSortChange} />
          </div>
        </div>

        <div className=" row row-cols-1 row-cols-md-2 background">
          {sortedCategoryNews && sortedCategoryNews.length > 0 ? (
            sortedCategoryNews.map((news, index) => (
              <div key={news.news_id} className={`col  ei-mobile-card-margin`}>
                <Link
                  href={`/news/${news.news_id}`}
                  passHref={true}
                  className="text-dark"
                >
                  <div key={news.news_id} className={`${styles['ei-card']}`}>
                    <img
                      src={`http://localhost:3005/uploads/${news.news_image}`}
                      className={`card-img-top img-fluid ${styles['custom-image']}`}
                      alt={news.news_title}
                    />
                    <div className="card-body text-left ms-2">
                      <p className="ei-create-at my-2 text-dark">
                        {news.created_at}
                      </p>
                      <h5 className="ei-card-title fw-bold mb-2 lh-base">
                        <span className="me-2">| {news.news_title} |</span>
                      </h5>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div></div>
          )}
        </div>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  )
}

export default CategoryNews
