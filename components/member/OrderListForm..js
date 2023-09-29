import React, { useState } from 'react'
import { FaAngleDown } from 'react-icons/fa6'
import Link from 'next/link'
import OrderItems from './OrderItems'

export default function OrderListForm() {
  const fakeUser = {
    id: 1,
    name: 'Jone Doe',
    email: 'johndoe@example.com',
    birthday: '1990-01-01',
    gender: '男',
    phone: '0909121343',
  }

  // const order = {
  //   id: 'NYKD45114514',
  //   data: '2023-10-10',
  //   price: 8200,
  //   state: '已完成',
  //   payment: '信用卡付款',
  //   openList: false,
  // }

  return (
    <>
      <div className={'table-box border border-dark'}>
        <div className={'form-title border-bottom border-dark p-3 d-flex'}>
          <span className="col-4">訂單管理</span>
          <div className="col-8 d-flex justify-content-between">
            <span className="">訂單日期</span>
            <span className="">訂單總額</span>
            <span className="">訂單狀態</span>
            <span className="">付款狀態</span>
            <span className="">訂單明細</span>
          </div>
        </div>
        {/*  */}
        <OrderItems />
        {/*  */}
      </div>
    </>
  )
}
