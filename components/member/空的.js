import React, { useState } from 'react'
import { FaAngleDown } from 'react-icons/fa6'
import Link from 'next/link'

export default function OrderListForm() {
  const fakeUser = {
    id: 1,
    name: 'Jone Doe',
    email: 'johndoe@example.com',
    birthday: '1990-01-01',
    gender: '男',
    phone: '0909121343',
  }

  return (
    <>
      <form>
        <div className={'form-box border border-dark'}>
          <div className={'form-title border-bottom border-dark p-3'}>
            會員資料檢視/修改
          </div>
          <div className="p-5">寫在這裡</div>
        </div>
        <div className={'container allow-btn p-0 mt-4'}>
          <button
            type="button"
            className={
              'btn-login text-center d-flex justify-content-center flex-column mb-5 agree'
            }
          >
            <span>確認並送出</span>
          </button>
        </div>
      </form>
    </>
  )
}
