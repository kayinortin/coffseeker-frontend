import React, { useEffect } from 'react'
import { FaTicket } from 'react-icons/fa6'
import Link from 'next/link'

export default function CouponItems({ coupon }) {
  // useEffect(() => {
  //   console.log(coupon)
  // }, [])
  return (
    <>
      {/*  */}
      <div className={'col-12 col-lg-6 d-flex mb-3'}>
        <div
          className={
            'coupon-image d-flex justify-content-center align-items-center border border-dark'
          }
        >
          <FaTicket className={'ticket'} />
        </div>
        <div className={'coupon-border position-relative'}>
          <img src={'/coupon-border.png'} className={'position-absolute'} />
          <div
            className={
              'd-flex flex-column justify-content-around coupon-content py-2 px-3'
            }
          >
            <div className="d-flex justify-content-between align-items-center">
              <span className={'title col-8 col-lg-auto'}>
                {coupon.coupon_name}
              </span>
              <Link
                href="/product"
                className={'border-0 p-2 link col-4 col-lg-auto'}
              >
                前往商城
              </Link>
            </div>
            <p className={'discount'}>{coupon.usage_restriction}</p>
            <div className={'text-end'}>
              <span className={'expire'}>有效期限 : {coupon.expires_at}</span>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
    </>
  )
}
