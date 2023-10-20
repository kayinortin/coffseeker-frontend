import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import styles from '../../../styles/_news.module.scss'
import NewsLayout from '@/components/news/news-layout'
import CategoryBtn from '@/components/news/category-btn'
import OrderBy from '@/components/news/order-by'
import Pagination from '@/components/news/pagination'
import Head from 'next/head'

const CategoryNews = () => {
  const router = useRouter()
  const { cid } = router.query
  const [currentSort, setCurrentSort] = useState('default')
  const [categoryNews, setCategoryNews] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)

  // 定義函數以發送分類新聞的API請求
  const fetchCategoryNews = (cid, page) => {
    axios
      .get(`http://localhost:3005/api/news/category/${cid}?page=${page}`)
      .then((response) => {
        console.log('API回應:', response.data)
        setCategoryNews(response.data.news)
        setTotalPages(response.data.totalPages)
        setCurrentPage(page)
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
      fetchCategoryNews(cid, currentPage)
    }
  }, [cid, currentPage])

  // 應用排序方式到消息列表
  const sortedCategoryNews = categoryNews.sort((a, b) => {
    if (currentSort === 'popular') {
      return b.views - a.views
    } else if (currentSort === 'oldest') {
      return new Date(a.created_at) - new Date(b.created_at)
    } else {
      return new Date(b.created_at) - new Date(a.created_at)
    }
  })

  const handlePageChange = (page) => {
    if (cid) {
      setCurrentPage(page)
      fetchCategoryNews(cid, page)
    }
  }

  useEffect(() => {
    if (cid) {
      fetchCategoryNews(cid, currentPage)
    }
  }, [cid, currentPage])

  return (
    <>
      <div className="container">
        <NewsLayout />
        <div className="d-md-flex justify-content-center align-items-end mt-lg-4 mb-lg-4">
          <div className="d-flex flex-column align-items-center me-lg-4">
            <CategoryBtn />
          </div>
          <div className="mt-lg-4 d-flex justify-content-center ms-lg-4">
            <OrderBy onChange={handleSortChange} />
          </div>
        </div>
        <div>
          <Head>
            <title>最新消息｜探索咖啡COFFSEEKER</title>
          </Head>
        </div>

        <div className="row row-cols-1 row-cols-md-2 background">
          {sortedCategoryNews && sortedCategoryNews.length > 0 ? (
            sortedCategoryNews.map((news, index) => (
              <div key={news.news_id} className={`col ei-mobile-card-margin`}>
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
