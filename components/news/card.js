import React, { useState } from 'react'
import Link from 'next/link'
import styles from '../../styles/_news.module.scss'
import newsData from '../../data/news/news.json'

export default function Card() {
  const [data, setData] = useState(newsData)

  return (
    <div className="ei-card-container row row-cols-1 row-cols-md-2">
      {newsData.map((news, index) => (
        <div key={news.id} className={`col mb-4`}>
          <Link href={`/news/${news.id}`} passHref className="text-dark">
            <div className={`${styles['ei-card']}`}>
              <img
                src={news.imageUrl}
                className={`card-img-top img-fluid ${styles['custom-image']}`}
                alt="..."
              />
              <div className="card-body text-left ms-2">
                <p className="ei-create-at my-2 text-dark">{news.date}</p>
                <h5 className="card-title fw-bold mb-2">
                  <span className="me-2">| {news.title} |</span>
                </h5>
                {/* <p className="card-text">{news.content}</p> */}
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
