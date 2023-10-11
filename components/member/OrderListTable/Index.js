import React, { useEffect, useState } from 'react'
import OrderDetailOpened from './OrderDetailOpened'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useUser } from '@/context/UserInfo'
import { FetchUserData } from '../FetchDatas/FetchUserData'
import Cookies from 'js-cookie'

export default function OrderListTable() {
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
            `http://localhost:3005/api/order/userOrders/${userId}`
          )
          // 獲得指定使用者的所有訂單
          setOrderData(response.data.orders)
        } catch (error) {
          console.error('錯誤:', error)
        }
      }
    }
    fetchOrders()
  }, [userData])

  const fakeOrderData = [
    {
      id: 1,
      user_id: 3,
      tracking_number: 'NYKD45114514',
      order_date: '2023-10-07 04:47:45',
      order_status: '已下訂',
      total_price: 1000,
      shipping_fee: 0,
      discount: 0,
      payment_method: '貨到付款',
    },
    {
      id: 2,
      user_id: 3,
      tracking_number: 'ABCD45114514',
      order_date: '2023-10-07 04:47:45',
      order_status: '已完成',
      total_price: 2000,
      shipping_fee: 0,
      discount: 0,
      payment_method: '貨到付款',
    },
    {
      id: 3,
      user_id: 3,
      tracking_number: 'ZAQS45114514',
      order_date: '2023-10-07 04:47:45',
      order_status: '已完成',
      total_price: 3000,
      shipping_fee: 0,
      discount: 0,
      payment_method: '信用卡',
    },
  ]

  const thead = ['訂單日期', '訂單總額', '訂單狀態', '付款方式', '訂單明細']

  return (
    <>
      <div className={'table-box'}>
        <div className={'border border-dark'}>
          <div className={'form-title border-bottom border-dark p-3 d-flex'}>
            <span className="col-4">訂單管理</span>
            {/* 桌機Table Head */}
            <div className="d-none d-lg-flex col-8 justify-content-between order-nav">
              {thead.map((v, i) => (
                <div className="text-center" key={i}>
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
