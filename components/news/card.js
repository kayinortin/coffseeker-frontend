import React, { useState } from 'react'
import Link from 'next/link'
import NewsDatabaseFetch from './NewstDataFetcher'
import styles from '../../styles/_news.module.scss'
import Pagination from '../news/pagination'
import CategoryBtn from './category-btn'
import OrderBy from './order-by'

export default function Card({ currentSort, newsData }) {
  // 解構 currentSort
  const [data, setData] = useState(null)
  // const [currentSort, setCurrentSort] = useState('default')

  const onDataFetched = (fetchedData) => {
    setData(fetchedData)
    // onDataFetched(fetchedData)
  }

  // 過濾和排序新聞列表
  const sortedNews = data
    ? data.news.slice().sort((a, b) => {
        if (currentSort === 'popular') {
          return b.views - a.views // 按最多人瀏覽排序
        } else if (currentSort === 'oldest') {
          return new Date(a.created_at) - new Date(b.created_at) // 按日期  舊到新
        } else if (currentSort === 'default') {
          return new Date(b.created_at) - new Date(a.created_at) //預設按日期 新到舊
        }
        return 0
      })
    : []

  return (
    <>
      <div className="">
        <div className=" row row-cols-1 row-cols-md-2 background ">
          {sortedNews && sortedNews.length > 0 ? (
            sortedNews.map((news) => (
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
                      <p className="ei-create-at my-2 text-dark -bold">
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
      </div>
      <NewsDatabaseFetch onDataFetched={onDataFetched} />
      {/* <Pagination /> */}
    </>
  )
}
