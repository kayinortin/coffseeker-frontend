import React, { useEffect, useState } from 'react'
import { FaAngleDown } from 'react-icons/fa'
import { FaAngleUp } from 'react-icons/fa'
import Image from 'next/image'

// 圖片的src
// http://localhost:3005/uploads/${image_main}
export default function OrderItems({ order }) {
  const [imgUrl, setImgUrl] = useState([])

  useEffect(() => {
    let imgUrl = 'images/none-img.png'
    // console.log('order.image', order.image)
    // 判斷照片欄位有無資料 有就抽取資料 無則設定預設值
    if (order.image !== '' && order.image != 0) {
      const imageArr = JSON.parse(order.image)
      // console.log('Images', imageArr[0])
      imgUrl = imageArr[0]
    }
    setImgUrl(imgUrl)
    // console.log('Images', imgUrl[0])
  }, [])

  return (
    <>
      {/* 桌機 */}
      <div className={'d-none d-lg-flex border-bottom border-dark p-2'}>
        <span className={'col-3 text-center'}>
          <Image
            src={`http://localhost:3005/uploads/${imgUrl}`}
            alt="Image Description"
            className={'imgborder'}
            width={100} // 设置图像宽度
            height={100} // 设置图像高度
          />
        </span>
        <div
          className={'col-9 d-flex justify-content-between align-items-center'}
        >
          <span className="col-6">{order.name}</span>
          <span className="col-2 text-center">NT${order.discountPrice}</span>
          <span className="col-2 text-center">{order.amount}/個</span>
          <span className="col-2 text-center">
            NT${order.discountPrice * order.amount}
          </span>
        </div>
      </div>
      {/* 手機版 */}
      <div className="d-lg-none border-bottom border-dark p-2">
        <div className={'d-flex align-items-center'}>
          <div className={'pe-3'}>
            <Image
              src={`http://localhost:3005/uploads/${imgUrl}`}
              alt="Image Description"
              className={'imgborder'}
              width={100} // 设置图像宽度
              height={100} // 设置图像高度
            />
          </div>
          <div className={''}>{order.name}</div>
        </div>
        <div className={'d-flex justify-content-between py-2'}>
          <div>NT${order.discountPrice}</div>
          <div>{order.amount}/個</div>
          <div>NT${order.discountPrice * order.amount}</div>
        </div>
      </div>
    </>
  )
}
