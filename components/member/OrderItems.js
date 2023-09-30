import React from 'react'
import { FaAngleDown } from 'react-icons/fa'
import { FaAngleUp } from 'react-icons/fa'
import Image from 'next/image'

export default function OrderItems() {
  const order = {
    img: '/course-image/coffeeImg_1.jpg',
    discraption: '想望咖啡【獨家風味】蒙馬特的午後咖啡豆 200g/莓果/酒感',
    type: '莓果/200g',
    count: '10/包',
    price: 500,
  }

  return (
    <>
      {/*  */}
      <div className={'d-flex border-bottom border-dark p-2'}>
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
      {/*  */}
    </>
  )
}
