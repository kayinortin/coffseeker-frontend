import React, { useEffect, useState } from 'react'
import { FaTicket } from 'react-icons/fa6'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useUser } from '@/context/UserInfo'
import { FetchUserData } from '../FetchDatas/FetchUserData'
import Cookies from 'js-cookie'
import CouponItems from './CouponItems'
import Lottie from 'react-lottie-player/dist/LottiePlayerLight'
import lottieJson from '@/public/map-image/logo-anime-30.json'

export default function CouponListTable({
  orderBy,
  setOrderBy,
  currentPage,
  setTotalPage,
}) {
  const [couponData, setCouponData] = useState(null)
  const [loading, setLoading] = useState(true)
  const { userData, setUserData } = useUser()
  const checkToken = Cookies.get('accessToken')
  useEffect(() => {
    const fetchData = async () => {
      if (userData === null || userData.providerId) {
        if (checkToken) {
          const fetchUser = await FetchUserData()
          console.log('fetchUser', fetchUser)
          await setUserData(fetchUser)
        }
      }
    }
    fetchData()
  }, [checkToken, setUserData, userData])

  useEffect(() => {
    setLoading(true)
    const fetchOrders = async () => {
      if (userData) {
        const userId = userData.id
        console.log('是這個嗎', userData)
        console.log(userData.id)
        if (userId) {
          try {
            const response = await axios.get(
              `http://localhost:3005/api/coupons/getCouponPages/${userId}/${orderBy}/${currentPage}`
            )
            // 獲得指定使用者的所有優惠券
            console.log(response)
            setCouponData(response.data.coupons)
            setTotalPage(response.data.totalPage)
            setTimeout(() => {
              setLoading(false)
            }, 300)
          } catch (error) {
            console.error('錯誤:', error)
          }
        }
      }
    }
    fetchOrders()
  }, [userData, orderBy, currentPage, setTotalPage])
  return (
    <>
      <form className={'table-box'}>
        <div className={'border border-dark'}>
          <div className={'form-title border-bottom border-dark p-3'}>
            優惠券
          </div>
          <div className="p-3 p-lg-5">
            <div
              className={`d-flex ${
                loading
                  ? 'w-100 justify-content-center'
                  : 'flex-wrap jusify-content-between'
              }`}
            >
              {couponData ? (
                couponData.length == 0 ? (
                  <div className={'text-center py-5'}>
                    您還沒有優惠券！請關注最新消息領取優惠券喔！
                  </div>
                ) : loading ? (
                  <Lottie
                    play
                    loop
                    style={{ width: 140, height: 140 }}
                    animationData={lottieJson}
                  />
                ) : (
                  <>
                    {couponData.map((v, i) => (
                      <CouponItems key={i} coupon={v} />
                    ))}
                  </>
                )
              ) : (
                <div>資料讀取中</div>
              )}
            </div>
          </div>
        </div>
      </form>
    </>
  )
}
