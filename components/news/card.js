import React, { useState } from 'react'
import Link from 'next/link'
import styles from '../../styles/_news.module.scss'
import newsData from '../../data/news/news.json'
import Pagination from '../news/pagination'

export default function Card() {
  const [data, setData] = useState(newsData)

  return (
    <div className="ei-card-container row row-cols-1 row-cols-md-2">
      {newsData.map((news, index) => (
        <div key={news.id} className={`col  ei-mobile-card-margin`}>
          <Link href={`/news/${news.id}`} passHref className="text-dark">
            <div className={`${styles['ei-card']}`}>
              <img
                src={news.imageUrl}
                className={`card-img-top img-fluid ${styles['custom-image']}`}
                alt="..."
              />
              <div className="card-body text-left ms-2">
                <p className="ei-create-at my-2 text-dark">{news.date}</p>
                <h5 className="ei-card-title fw-bold mb-2 lh-base">
                  <span className="me-2">| {news.title} |</span>
                </h5>
              </div>
            </div>
          </Link>
        </div>
      ))}
      <Pagination />
    </div>
  )
}
