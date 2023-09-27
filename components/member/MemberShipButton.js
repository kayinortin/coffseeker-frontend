import React, { useState } from 'react'
import { SlUser } from 'react-icons/sl'
import Link from 'next/link'

export default function MemberShipButton() {
  const [dropDown, setDropdown] = useState(false)
  const memberOptions = [
    {
      id: 1,
      option: '會員中心',
      href: '/member',
    },
    {
      id: 2,
      option: '會員資料檢視/修改',
      href: '/member/info',
    },
    {
      id: 3,
      option: '修改密碼',
      href: '/member/change-password',
    },
    {
      id: 4,
      option: '訂單管理',
      href: '/member/order-list',
    },
    {
      id: 5,
      option: '我的收藏',
      href: '/member/likes',
    },
    {
      id: 6,
      option: '優惠券',
      href: '/member/coupon',
    },
    {
      id: 7,
      option: '登出',
      href: '/member/login',
    },
  ]
  return (
    <>
      <div class="membership-button position-relative">
        <SlUser
          className={'mb-2'}
          onClick={() => {
            if (dropDown) {
              setDropdown(false)
            } else {
              setDropdown(true)
            }
          }}
        />
        {dropDown ? (
          <ul class="member-dropdown d-flex flex-column position-absolute">
            {memberOptions.map((v) => {
              return (
                <>
                  <li key={v.id} className={'dropdown-option px-4 py-2'}>
                    <Link
                      class="d-flex justify-content-center"
                      href={v.href}
                      onClick={() => {
                        setDropdown(false)
                      }}
                    >
                      {v.option}
                    </Link>
                  </li>
                </>
              )
            })}
          </ul>
        ) : (
          <></>
        )}
      </div>
    </>
  )
}
