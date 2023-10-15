import React, { useState } from 'react'
import Link from 'next/link'
import styles from '../../styles/_news.module.scss'

export default function Card({ newsData }) {
  // console.log(newsData);
  return (
    <>
      <div className="">
        <div className=" row row-cols-1 row-cols-md-2 background ">
          {newsData && newsData.length > 0 ? (
            newsData.map((news) => (
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
                        <span className="me- fs-5">| {news.news_title} |</span>
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
