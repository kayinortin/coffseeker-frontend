import React from 'react'
import { FaAngleDown } from 'react-icons/fa'
import { FaAngleUp } from 'react-icons/fa'
import Image from 'next/image'
import OrderItems from './OrderItems'

export default function OrderdetailOpened() {
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
        <div className={'col-8 d-flex justify-content-between order-nav'}>
          <div className="text-center">{order.data}</div>
          <div className="text-center">NT${order.price}</div>
          <div className="text-center">{order.state}</div>
          <div className="text-center">{order.payment}</div>
          <div className="text-center border border-dark">
            {order.openList ? <FaAngleUp /> : <FaAngleDown />}
          </div>
        </div>
      </div>
      {/*  */}
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
      <OrderItems />
      <OrderItems />
      <OrderItems />
      <OrderItems />
      <OrderItems />
      {/*  */}
      <div className={'p-2 border'}>
        <div className={'border border-dark p-2'}>
          <div className="d-flex justify-content-between p-2">
            <span>商品</span>
            <span>4 / 項</span>
          </div>
          {/*  */}
          <div className="d-flex justify-content-between p-2">
            <span>小計</span>
            <span>NT$ 2380</span>
          </div>
          {/*  */}
          <div className="d-flex justify-content-between p-2">
            <span>運費</span>
            <span>0</span>
          </div>
          {/*  */}
          <div className="d-flex justify-content-between p-2">
            <span>優惠</span>
            <span className={'text-danger'}>-380</span>
          </div>
          {/*  */}
          <hr />
          <div className="d-flex justify-content-between p-2">
            <span>合計</span>
            <span className={'orange-text'}>NT$ 2000</span>
          </div>
          {/*  */}
        </div>
      </div>
    </>
  )
}
