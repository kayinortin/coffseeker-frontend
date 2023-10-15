import React, { useEffect, useState } from 'react'
import OrderDetailOpened from './OrderdetailOpened'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useUser } from '@/context/UserInfo'
import { FetchUserData } from '../FetchDatas/FetchUserData'
import Cookies from 'js-cookie'

export default function OrderListTable({
  orderBy,
  setOrderBy,
  currentPage,
  setTotalPage,
}) {
  const [orderData, setOrderData] = useState(null)

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
            `http://localhost:3005/api/order/userOrders/${userId}/${orderBy}/${currentPage}`
          )
          // 獲得指定使用者的所有訂單
          console.log(response)
          setOrderData(response.data.orders)
          setTotalPage(response.data.totalPage)
        } catch (error) {
          console.error('錯誤:', error)
        }
      }
    }
    fetchOrders()
  }, [userData, orderBy, currentPage])

  const thead = ['訂單日期', '訂單總額', '訂單狀態', '付款方式', '訂單明細']

  return (
    <>
      <div className={'table-box'}>
        <div className={'border border-dark'}>
          <div className={'form-title border-bottom border-dark p-3 d-flex'}>
            <span className={'col-4'}>歷史訂單</span>
            {/* 桌機Table Head */}
            <div
              className={
                'd-none d-lg-flex col-8 justify-content-between order-nav'
              }
            >
              {thead.map((v, i) => (
                <div className={'text-center'} key={i}>
                  {v}
                </div>
              ))}
            </div>
          </div>
          {/* 訂單列表 */}
          {orderData ? (
            orderData.length == 0 ? (
              <div className={'text-center py-5'}>尚未成立任何訂單</div>
            ) : (
              orderData.map((v) => (
                <div key={v.id}>
                  <OrderDetailOpened order={v} />
                </div>
              ))
            )
          ) : (
            <div className={'text-center py-5'}>資料讀取中</div>
          )}
        </div>
      </div>
    </>
  )
}
