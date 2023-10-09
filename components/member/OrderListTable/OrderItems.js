import React, { useEffect, useState } from 'react'
import { FaAngleDown } from 'react-icons/fa'
import { FaAngleUp } from 'react-icons/fa'
import Image from 'next/image'

export default function OrderItems({ order }) {
  return (
    <>
      {/* 桌機 */}
      <div className={'d-none d-lg-flex border-bottom border-dark p-2'}>
        <span className={'col-3 text-center'}>
          <Image
            src={order.img}
            alt="Image Description"
            width={100} // 设置图像宽度
            height={100} // 设置图像高度
          />
        </span>
        <div
          className={'col-9 d-flex justify-content-between align-items-center'}
        >
          <span className="col-6">{order.discraption}</span>
          <span className="col-2 text-center">{order.type}</span>
          <span className="col-2 text-center">{order.count}</span>
          <span className="col-2 text-center">NT${order.price}</span>
        </div>
      </div>
      {/* 手機版 */}
      <div className="d-lg-none border-bottom border-dark p-2">
        <div className={'d-flex align-items-center'}>
          <div className={'pe-3'}>
            <Image
              src={order.img}
              alt="Image Description"
              width={100} // 设置图像宽度
              height={100} // 设置图像高度
            />
          </div>
          <div className={''}>{order.discraption}</div>
        </div>
        <div className={'d-flex justify-content-between py-2'}>
          <div>{order.type}</div>
          <div>{order.count}</div>
          <div>NT${order.price}</div>
        </div>
      </div>
    </>
  )
}
