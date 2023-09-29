import React from 'react'
import { FaAngleDown } from 'react-icons/fa'
import { FaAngleUp } from 'react-icons/fa'
import Image from 'next/image'

export default function OrderItems() {
  const order = {
    id: 'NYKD45114514',
    data: '2023-10-10',
    price: 8200,
    state: '已完成',
    payment: '信用卡付款',
    openList: false,
  }

  return (
    <>
      <div className={'p-3 d-flex border-bottom border-dark'}>
        <span className={'col-4 text-center'}>{order.id}</span>
        <div className={'col-8 d-flex justify-content-between'}>
          <span className="">{order.data}</span>
          <span className="">NT${order.price}</span>
          <span className="">{order.state}</span>
          <span className="">{order.payment}</span>
          <span className="">{order.openList ? '收合明細' : '展開明細'}</span>
        </div>
      </div>
      <div className={'p-2 border-bottom border-dark'}>
        <div className="border border-dark d-flex order-state">
          <div
            className={'d-flex flex-column justify-content-center col-3 pt-1'}
          >
            <div className="text-center">已下訂</div>
            <div className="text-center data py-1">2023-08-29 11:24</div>
            <div className="p-1 border orange"></div>
          </div>
          <div
            className={'d-flex flex-column justify-content-center col-3 pt-1'}
          >
            <div className="text-center">未理貨</div>
            <div className="text-center data py-1">---------- --:--</div>
            <div className="p-1 border gray"></div>
          </div>
          <div
            className={'d-flex flex-column justify-content-center col-3 pt-1'}
          >
            <div className="text-center">未出貨</div>
            <div className="text-center data py-1">---------- --:--</div>
            <div className="p-1 border gray"></div>
          </div>
          <div
            className={'d-flex flex-column justify-content-center col-3 pt-1'}
          >
            <div className="text-center">未完成</div>
            <div className="text-center data py-1">---------- --:--</div>
            <div className="p-1 border gray"></div>
          </div>
        </div>
      </div>
      {/*  */}
      <div className={'d-flex border-bottom border-dark p-2'}>
        <span className={'col-3 text-center'}>
          <Image
            src="/course-image/coffeeImg_1.jpg"
            alt="Image Description"
            width={100} // 设置图像宽度
            height={100} // 设置图像高度
          />
        </span>
        <div
          className={'col-9 d-flex justify-content-between align-items-center'}
        >
          <span className="">{order.data}</span>
          <span className="">NT${order.price}</span>
          <span className="">{order.state}</span>
          <span className="">{order.payment}</span>
          <span className="">{order.openList ? '收合明細' : '展開明細'}</span>
        </div>
      </div>
      {/*  */}
      <div className={'p-2 border test-area'}>
        <div className={'border border-dark p-2'}>123</div>
      </div>
    </>
  )
}
