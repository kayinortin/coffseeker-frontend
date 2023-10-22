import React, { useState, useEffect } from 'react'
import { FaTicket } from 'react-icons/fa6'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useAuthJWT } from '@/context/useAuthJWT'
import Link from 'next/link'
import Head from 'next/head'
import Swal from 'sweetalert2'

export default function Coupons() {
  const [coupons, setCoupons] = useState([])
  const [userCoupons, setUserCoupons] = useState([]) // 儲存會員已領取的優惠券
  const router = useRouter()
  const { authJWT } = useAuthJWT() //獲取認證訊息

  useEffect(() => {
    // 獲取優惠券列表
    axios
      .get('http://localhost:3005/api/news/coupons')
      .then((response) => {
        setCoupons(response.data)

        // 存優惠券在localStorage中 -- 給購物車用的
        localStorage.setItem('userCoupons', JSON.stringify(response.data))
        console.log(localStorage)
      })
      .catch((error) => {
        console.error('獲取優惠券資料失敗:', error)
      })

    // 獲取會員已領取的優惠券列表
    if (authJWT.isAuth) {
      axios
        .get('http://localhost:3005/api/news/userCoupons', {
          params: { userId: authJWT.userData.id },
        })
        .then((response) => {
          setUserCoupons(response.data)
        })
        .catch((error) => {
          console.error('獲取會員已領取的優惠券失敗:', error)
        })
    }
  }, [authJWT.isAuth])

  const handleRedeemClick = async (couponId) => {
    if (!authJWT.isAuth) {
      router.push(`/member/login?from=${router.pathname}`)
    } else {
      const userId = authJWT.userData.id

      // 在userCoupons中查找是否已經領取過該優惠券
      const hasRedeemed = userCoupons.some(
        (userCoupon) => userCoupon.coupon_id === couponId
      )

      if (!hasRedeemed) {
        // 未領取過，執行領取操作
        axios
          .post('http://localhost:3005/api/news/addCoupon', {
            couponId,
            userId,
          })
          .then((response) => {
            console.log('成功領取優惠券，coupon_id:', couponId)
            // 使用SweetAlert來顯示成功訊息
            Swal.fire({
              title: '優惠券已成功領取',
              icon: 'success',
              iconColor: '#b54b33',
              confirmButtonText: '確定',
            }).then((result) => {})
          })
          .catch((error) => {
            console.error('領取優惠券失敗:', error)
            // 使用SweetAlert來顯示錯誤訊息
            Swal.fire({
              title: '領取優惠券失敗',
              text: '您已領取過此優惠券',
              icon: 'error',
              iconColor: '#1C262C',
              confirmButtonText: '確定',
            })
          })
      } else {
        // 已領取過，顯示提示訊息
        Swal.fire({
          title: '優惠券已經領取過',
          icon: 'warning',
          iconColor: '#1C262C',
          confirmButtonText: '確定',
        })
      }
    }
  }

  return (
    <>
      {/* 標題區 */}
      <div className="d-flex justify-content-center my-4 align-items-center mobile-news-title">
        <div className="ei-line me-3"></div>
        <h3 className="text-center news-title fs-2">優惠券區</h3>
        <div className="ei-line ms-3"></div>
      </div>
      <div className="col-12 col-lg-6 d-flex mb-3 flex-wrap align-items-center justify-content-center mt-4 mb-4 container">
        <div className="row">
          {/* <nav className="nav-breadcrumb ms-3 d-none d-sm-block">
            <ol className="ei-breadcrumb m-3 list-inline"> */}
          <div>
            <Head>
              <title>優惠券區｜探索咖啡COFFSEEKER</title>
            </Head>
          </div>

          {/* <li className="breadcrumb-item list-inline-item">
                <Link href="/" className="link">
                  首頁
                </Link>
              </li>
              <li className="breadcrumb-item list-inline-item">
                <Link
                  href="/news"
                  className="breadcrumb-item text-decoration-none link ms-2"
                >
                  優惠券
                </Link>
              </li>
            </ol>
          </nav> */}
        </div>
        {coupons.map((coupon) => (
          <div key={coupon.id} className="col-12 col-lg-6 d-flex mb-3 mt-4">
            <div
              className={
                'coupon-image d-flex justify-content-center align-items-center border border-dark'
              }
            >
              <FaTicket className="ticket" />
            </div>
            <div className={'coupon-border position-relative'}>
              <img src={'/coupon-border.png'} className="position-absolute" />
              <div
                className={
                  'd-flex flex-column justify-content-around coupon-content py-2 px-3'
                }
              >
                <div className="d-flex justify-content-between align-items-center">
                  <span className="title">{coupon.coupon_name}</span>
                  <div className="text-end">
                    {authJWT.isAuth ? (
                      userCoupons.some(
                        (userCoupon) =>
                          userCoupon.coupon_id === coupon.coupon_id
                      ) ? (
                        <button className="border-0 p-2 link" disabled>
                          已領取
                        </button>
                      ) : (
                        <button
                          onClick={() => handleRedeemClick(coupon.coupon_id)}
                          className="border-0 p-2 link"
                        >
                          領取
                        </button>
                      )
                    ) : (
                      <button
                        onClick={() =>
                          router.push(`/member/login?from=${router.pathname}`)
                        }
                        className="border-0 p-2 link"
                      >
                        領取
                      </button>
                    )}
                  </div>
                </div>
                <p className="discount">{coupon.usage_restriction}</p>
                <div className="text-end">
                  <span className="expire">有效期限 : {coupon.expires_at}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
