import React, { useState } from 'react'
import Link from 'next/link'
import NewsDatabaseFetch from './NewstDataFetcher'
import styles from '../../styles/_news.module.scss'

export default function Card({ currentSort, newsData, selectedCategory }) {
  const [data, setData] = useState({ news: [] })

  const onDataFetched = (fetchedData) => {
    setData(fetchedData)
  }

  // 過濾和排序新聞列表
  const filteredNews = newsData.filter((news) => {
    if (selectedCategory === 'allnews') {
      return true // 不進行篩選，顯示所有新聞
    } else {
      return news.category === selectedCategory //
    }
  })

  const sortedNews = filteredNews.slice().sort((a, b) => {
    if (currentSort === 'popular') {
      return b.views - a.views
    } else if (currentSort === 'oldest') {
      return new Date(a.created_at) - new Date(b.created_at)
    } else {
      return new Date(b.created_at) - new Date(a.created_at)
    }
  })

  return (
    <>
      <NewsDatabaseFetch onDataFetched={onDataFetched} />
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
            <div>暫無最新消息可顯示</div>
          )}
        </div>
      </div>
    </>
  )
}
