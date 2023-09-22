import React, { useState } from 'react'
import styles from '../../styles/_news.module.scss'

export default function CategoryBtn() {
  const [activeButton, setActiveButton] = useState('allnews')

  return (
    <>
      <div className="ei-btn-container">
        <button
          className={`me-3 ${activeButton === 'allnews' ? 'active' : ''}`}
          onClick={() => setActiveButton('allnews')}
        >
          全部消息
        </button>
        <button
          className={`me-3 ${activeButton === 'activity' ? 'active' : ''}`}
          onClick={() => setActiveButton('activity')}
        >
          活動消息
        </button>
        <button
          className={`${activeButton === 'newProduct' ? 'active' : ''}`}
          onClick={() => setActiveButton('newProduct')}
        >
          新品上架
        </button>
      </div>
    </>
  )
}
