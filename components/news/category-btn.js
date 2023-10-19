import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function CategoryBtn() {
  const router = useRouter()
  const [activeButton, setActiveButton] = useState('allnews')

  // 在元件初始化時檢查路由，並根據路由的 cid 參數來設置初始的 activeButton 狀態
  useEffect(() => {
    const { cid } = router.query
    if (cid) {
      switch (cid) {
        case '1':
          setActiveButton('activity')
          break
        case '2':
          setActiveButton('newProduct')
          break
        case '3':
          setActiveButton('coffeeKnowlege')
          break
        case '4':
          setActiveButton('coupons')
          break
        default:
          setActiveButton('allnews')
      }
    } else {
      setActiveButton('allnews')
    }
  }, [router.query])

  const handleButtonClick = (categoryId) => {
    setActiveButton(categoryId)

    // 根據不同按鈕選擇設置不同的 cid
    let cid
    switch (categoryId) {
      case 'allnews':
        // 不需要特別設定 cid
        break
      case 'activity':
        cid = 1 // category_id = 1
        break
      case 'newProduct':
        cid = 2 // category_id = 2
        break
      case 'coffeeKnowlege':
        cid = 3 // category_id = 3
        break
      case 'coupons':
        // 在這裡設定不同的路由行為，例如導向到特定頁面
        router.push('/news/coupons')
        break
      default:
        break
    }

    // 使用路由導向到不同的 URL
    if (cid) {
      router.push(`/news/category/${cid}`)
    } else {
      router.push('/news') // 如果不需要特別的 cid，導向到所有消息
    }
  }

  return (
    <div className="container ">
      <div className="row ">
        {/* 網頁版（非手機板）*/}
        <div className="col-sm-12 text-start d-none d-sm-block ">
          <div className="btn-group mt-3">
            <button
              className={`btn ei-bold-text rounded-0 ${
                activeButton === 'allnews'
                  ? 'btn-secondary active'
                  : 'btn-outline-secondary'
              }`}
              onClick={() => handleButtonClick('allnews')}
            >
              全部消息
            </button>
            <button
              className={`btn ei-bold-text rounded-0 ${
                activeButton === 'activity'
                  ? 'btn-secondary active'
                  : 'btn-outline-secondary'
              }`}
              onClick={() => handleButtonClick('activity')}
            >
              活動消息
            </button>
            <button
              className={`btn ei-bold-text rounded-0 ${
                activeButton === 'newProduct'
                  ? 'btn-secondary active'
                  : 'btn-outline-secondary'
              }`}
              onClick={() => handleButtonClick('newProduct')}
            >
              新品上架
            </button>
            <button
              className={`btn ei-bold-text rounded-0 ${
                activeButton === 'coffeeKnowlege'
                  ? 'btn-secondary active'
                  : 'btn-outline-secondary'
              }`}
              onClick={() => handleButtonClick('coffeeKnowlege')}
            >
              咖啡知識
            </button>
            <button
              className={`btn ei-bold-text rounded-0 ${
                activeButton === 'coupons'
                  ? 'btn-secondary active'
                  : 'btn-outline-secondary'
              }`}
              onClick={() => handleButtonClick('coupons')}
            >
              優惠券區
            </button>
          </div>
        </div>
        {/* 手機板 */}
        <div className="container ei-mobile-category-btn d-lg-none">
          <div className="btn-group col-12  ">
            <button
              className={`btn ei-bold-text rounded-0 ${
                activeButton === 'allnews'
                  ? 'btn-secondary active'
                  : 'btn-outline-secondary'
              }`}
              onClick={() => handleButtonClick('allnews')}
            >
              全部消息
            </button>
            <button
              className={`btn ei-bold-text rounded-0 ${
                activeButton === 'activity'
                  ? 'btn-secondary active'
                  : 'btn-outline-secondary'
              }`}
              onClick={() => handleButtonClick('activity')}
            >
              活動消息
            </button>
            <button
              className={`btn ei-bold-text rounded-0 ${
                activeButton === 'newProduct'
                  ? 'btn-secondary active'
                  : 'btn-outline-secondary'
              }`}
              onClick={() => handleButtonClick('newProduct')}
            >
              新品上架
            </button>
            <button
              className={`btn ei-bold-text rounded-0 ${
                activeButton === 'coffeeKnowlege'
                  ? 'btn-secondary active'
                  : 'btn-outline-secondary'
              }`}
              onClick={() => handleButtonClick('coffeeKnowlege')}
            >
              咖啡知識
            </button>
            <button
              className={`btn ei-bold-text rounded-0 ${
                activeButton === 'coupons'
                  ? 'btn-secondary active'
                  : 'btn-outline-secondary'
              }`}
              onClick={() => handleButtonClick('coupons')}
            >
              優惠券區
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
