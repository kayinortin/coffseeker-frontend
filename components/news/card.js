import React, { useState } from 'react'
import Link from 'next/link'
import NewsDatabaseFetch from './NewstDataFetcher'
import styles from '../../styles/_news.module.scss'
import Pagination from '../news/pagination'
import CategoryBtn from './category-btn'
import OrderBy from './order-by'

export default function Card() {
  const [data, setData] = useState(null)

  const onDataFetched = (fetchedData) => {
    setData(fetchedData)
  }

  return (
    <>
      <div className="d-md-flex justify-content-center align-items-center mb-4">
        <div className="d-flex flex-column align-items-center">
          <CategoryBtn />
        </div>
        <div className="mt-4 d-flex justify-content-center">
          <OrderBy />
        </div>
      </div>

      <div className="ei-card-container row row-cols-1 row-cols-md-2 background ">
        {data && data.news && data.news.length > 0 ? (
          data.news.map((news, index) => (
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
      <NewsDatabaseFetch onDataFetched={onDataFetched} />
      <Pagination />
    </>
  )
}
