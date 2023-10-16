import React, { useEffect, useState } from 'react'
import { FaTicket } from 'react-icons/fa6'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useUser } from '@/context/UserInfo'
import { FetchUserData } from '../FetchDatas/FetchUserData'
import Cookies from 'js-cookie'
import CouponItems from './CouponItems'

export default function CouponListTable({
  orderBy,
  setOrderBy,
  currentPage,
  setTotalPage,
}) {
  const [couponData, setCouponData] = useState(null)
  const { userData, setUserData } = useUser()
  const checkToken = Cookies.get('accessToken')

  useEffect(() => {
    const fetchData = async () => {
      if (!userData) {
        if (checkToken) {
          const fetchUser = await FetchUserData()
          // console.log('fetchUser是是是 ', fetchUser)
          await setUserData(fetchUser)
        }
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchOrders = async () => {
      if (userData) {
        try {
          const userId = userData.id
          const response = await axios.get(
            `http://localhost:3005/api/coupons/getCouponPages/${userId}/${orderBy}/${currentPage}`
          )
          // 獲得指定使用者的所有訂單
          console.log(response)
          setCouponData(response.data.coupons)
          setTotalPage(response.data.totalPage)
        } catch (error) {
          console.error('錯誤:', error)
        }
      }
    }
    fetchOrders()
  }, [userData, orderBy, currentPage])
  return (
    <>
      <form className={'table-box'}>
        <div className={'border border-dark'}>
          <div className={'form-title border-bottom border-dark p-3'}>
            優惠券
          </div>
          <div className="p-3 p-lg-5">
            <div className={'d-flex flex-wrap jusify-content-between'}>
              {couponData ? (
                couponData.length == 0 ? (
                  <div className={'text-center py-5'}>尚未成立任何訂單</div>
                ) : (
                  couponData.map((v, i) => <CouponItems key={i} coupon={v} />)
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
