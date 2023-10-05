// pages/news/category/[cid].js

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

  useEffect(() => {
    // 在此處使用 cid 發送 API 請求以獲取分類新聞
    if (cid) {
      axios
        .get(`http://localhost:3005/api/news/category/${cid}`)
        .then((response) => {
          setCategoryNews(response.data)
        })
        .catch((error) => {
          console.error('請求出錯:', error)
        })
    }
  }, [cid])

  // 處理排序方式變更，並更新排序方式
  const handleSortChange = (newSort) => {
    setCurrentSort(newSort)
  }

  // 應用排序方式到消息列表
  const sortedCategoryNews = categoryNews.sort((a, b) => {
    if (currentSort === 'popular') {
      return b.views - a.views // 按最多人瀏覽排序
    } else if (currentSort === 'oldest') {
      return new Date(a.created_at) - new Date(b.created_at) // 舊到新
    } else if (currentSort === 'default') {
      return new Date(b.created_at) - new Date(a.created_at) // 預設新到舊
    }
    return 0
  })

  return (
    <>
      <div className="container">
        <NewsLayout />
        <div className="d-md-flex justify-content-center align-items-center mb-4">
          <div className="d-flex flex-column align-items-center">
            <CategoryBtn />
          </div>
          <div className="mt-4 d-flex justify-content-center">
            <OrderBy onChange={handleSortChange} />
          </div>
        </div>

        <div className=" row row-cols-1 row-cols-md-2 background">
          {sortedCategoryNews && sortedCategoryNews.length > 0 ? (
            sortedCategoryNews.map((news, index) => (
              <div key={news.id} className={`col  ei-mobile-card-margin`}>
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
            <div>暫無最新消息可顯示</div>
          )}
        </div>
      </div>
      <Pagination />
    </>
  )
}

export default CategoryNews
