import React, { useState } from 'react'
import styles from '../../styles/_news.module.scss'

export default function CategoryBtn() {
  const [activeButton, setActiveButton] = useState('allnews')

  return (
    <div className="ei-btn-container">
      <div className="row">
        {/* 網頁版（非手機板）*/}
        <div className="col-sm-12 text-start d-none d-sm-block">
          <div className="btn-group mt-3">
            <button
              className={`btn rounded-0 ${
                activeButton === 'allnews'
                  ? 'btn-secondary active'
                  : 'btn-outline-secondary'
              }`}
              onClick={() => setActiveButton('allnews')}
            >
              全部消息
            </button>
            <button
              className={`btn rounded-0 ${
                activeButton === 'activity'
                  ? 'btn-secondary active'
                  : 'btn-outline-secondary'
              }`}
              onClick={() => setActiveButton('activity')}
            >
              活動消息
            </button>
            <button
              className={`btn rounded-0 ${
                activeButton === 'newProduct'
                  ? 'btn-secondary active'
                  : 'btn-outline-secondary'
              }`}
              onClick={() => setActiveButton('newProduct')}
            >
              新品上架
            </button>
            <button
              className={`btn rounded-0 ${
                activeButton === 'coffeeKnowlege'
                  ? 'btn-secondary active'
                  : 'btn-outline-secondary'
              }`}
              onClick={() => setActiveButton('coffeeKnowlege')}
            >
              咖啡知識
            </button>
          </div>
        </div>
        {/* 手機板 */}
        <div className="col-sm-12 text-end ei-mobile-category-btn d-lg-none">
          <div className="btn-group mt-3">
            <button
              className={`btn rounded-0 ${
                activeButton === 'allnews'
                  ? 'btn-secondary active'
                  : 'btn-outline-secondary'
              }`}
              onClick={() => setActiveButton('allnews')}
            >
              全部消息
            </button>
            <button
              className={`btn rounded-0 ${
                activeButton === 'activity'
                  ? 'btn-secondary active'
                  : 'btn-outline-secondary'
              }`}
              onClick={() => setActiveButton('activity')}
            >
              活動消息
            </button>
            <button
              className={`btn rounded-0 ${
                activeButton === 'newProduct'
                  ? 'btn-secondary active'
                  : 'btn-outline-secondary'
              }`}
              onClick={() => setActiveButton('newProduct')}
            >
              新品上架
            </button>
            <button
              className={`btn rounded-0 ${
                activeButton === 'coffeeKnowlege'
                  ? 'btn-secondary active'
                  : 'btn-outline-secondary'
              }`}
              onClick={() => setActiveButton('coffeeKnowlege')}
            >
              咖啡知識
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
