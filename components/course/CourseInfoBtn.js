import React, { useState } from 'react'
import styles from '@/styles/_course.module.scss'

export default function CategoryBtn() {
  const [activeButton, setActiveButton] = useState('introduction')

  return (
    <div className="d-flex justify-content-center my-5 btn-course-group">
      <div className="row">
        {/* 網頁版（非手機板）*/}
        <div className="col-sm-12 text-start d-none d-sm-block">
          <div className="btn-group mt-3">
            <button
              className={`btn rounded-0 ${
                activeButton === 'introduction'
                  ? styles.active
                  : 'btn-outline-secondary'
              }`}
              onClick={() => setActiveButton('introduction')}
            >
              課程介紹
            </button>
            <button
              className={`btn rounded-0 ${
                activeButton === 'specialty'
                  ? styles.active
                  : 'btn-outline-secondary'
              }`}
              onClick={() => setActiveButton('specialty')}
            >
              課程特色
            </button>
            <button
              className={`btn rounded-0 ${
                activeButton === 'review'
                  ? styles.active
                  : 'btn-outline-secondary'
              }`}
              onClick={() => setActiveButton('review')}
            >
              學員評價
            </button>
          </div>
        </div>
        {/* 手機板 */}
        <div className="col-sm-12 text-end ei-mobile-category-btn d-lg-none">
          <div className="btn-group mt-3">
            <button
              className={`btn rounded-0 ${
                activeButton === 'introduction'
                  ? 'btn-secondary active'
                  : 'btn-outline-secondary'
              }`}
              onClick={() => setActiveButton('introduction')}
            >
              全部消息
            </button>
            <button
              className={`btn rounded-0 ${
                activeButton === 'specialty'
                  ? 'btn-secondary active'
                  : 'btn-outline-secondary'
              }`}
              onClick={() => setActiveButton('specialty')}
            >
              活動消息
            </button>
            <button
              className={`btn rounded-0 ${
                activeButton === 'review'
                  ? 'btn-secondary active'
                  : 'btn-outline-secondary'
              }`}
              onClick={() => setActiveButton('review')}
            >
              新品上架
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
