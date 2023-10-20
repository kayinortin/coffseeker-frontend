import React, { useEffect, useRef, useState } from 'react'
import { FaAngleDown } from 'react-icons/fa'
import { FaAngleUp } from 'react-icons/fa'
import OrderItems from './OrderItems'
import axios from 'axios'

// 10/11 尚未完成
// 1.訂單時間排序
// 2.分頁

export default function OrderDetailOpened({ order }) {
  const [openDetail, setOpenDetail] = useState(false)
  const [orderItem, setOrderItem] = useState([])
  const [TotalAmount, setTotalAmount] = useState(0)
  const [TotalPrice, setTotalPrice] = useState(0)
  const [SubTotal, setSubTotal] = useState(0)

  const contentRef = useRef(null)

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const ordertrackingNumber = order.tracking_number
        const response = await axios.get(
          `http://localhost:3005/api/order/orderItems/${ordertrackingNumber}`
        )
        // 獲得指定使用者的所有訂單
        // console.log('Item資料', response.data)

        console.log('orderItems', response.data.orderItems)

        setOrderItem(response.data.orderItems)
      } catch (error) {
        console.error('錯誤:', error)
      }
    }
    fetchItems()
  }, [])

  // 算出數量及價格總和
  useEffect(() => {
    let subtotal = 0
    let totalAmount = 0
    let Total = 0
    orderItem.map((v) => {
      subtotal += v.discountPrice * v.amount
      totalAmount += v.amount
      Total = subtotal + parseInt(order.shipping_fee - order.discount_price)
    })

    setTotalPrice(subtotal)
    setTotalAmount(totalAmount)
    setSubTotal(Total)
  }, [orderItem])

  useEffect(() => {
    // 展開訂單:
    if (openDetail) {
      // 計算內容高度並套用在元素上
      const contentHeight = contentRef.current.scrollHeight
      contentRef.current.style.height = `${contentHeight}px`
    } else {
      // 關閉時將高度設為0
      contentRef.current.style.height = '0px'
    }
  }, [openDetail])

  const OrderTbody = [
    order.order_date.match(/\d{4}-\d{2}-\d{2}/)[0],
    `NT$${order.total_price}`,
    order.order_status,
    order.payment,
  ]
  // 未展開訂單的顯示資訊
  const OrderTbodyRWD = [
    {
      title: '訂單日期',
      value: order.order_date.match(/\d{4}-\d{2}-\d{2}/)[0],
    },
    {
      title: '訂單總額',
      value: `NT${order.total_price}`,
    },
    {
      title: '訂單狀態',
      value: order.order_status,
    },
    {
      title: '付款方式',
      value: order.payment,
    },
  ]

  // 訂單狀態的判斷
  const statusStyles = {
    待付款: {
      state1: ['待付款', 'gray'],
      state2: ['未理貨', 'gray'],
      state3: ['未發貨', 'gray'],
      state4: ['未完成', 'gray'],
    },
    已付款: {
      state1: ['已付款', 'orange'],
      state2: ['未理貨', 'gray'],
      state3: ['未發貨', 'gray'],
      state4: ['未完成', 'gray'],
    },
    理貨中: {
      state1: ['已付款', 'orange'],
      state2: ['理貨中', 'orange'],
      state3: ['未發貨', 'gray'],
      state4: ['未完成', 'gray'],
    },
    已發貨: {
      state1: ['已付款', 'orange'],
      state2: ['理貨中', 'orange'],
      state3: ['已發貨', 'orange'],
      state4: ['未完成', 'gray'],
    },
    已完成: {
      state1: ['已付款', 'orange'],
      state2: ['理貨中', 'orange'],
      state3: ['已發貨', 'orange'],
      state4: ['已完成', 'orange'],
    },
    已取消: {
      state1: ['-----', 'gray'],
      state2: ['-----', 'gray'],
      state3: ['-----', 'gray'],
      state4: ['-----', 'gray'],
    },
  }

  const orderStatus = statusStyles[order.order_status]

  const OrderStatus = [
    {
      state: orderStatus.state1[0],
      time: order.order_date,
      class: orderStatus.state1[1],
    },
    {
      state: orderStatus.state2[0],
      time: order.tally_date,
      class: orderStatus.state2[1],
    },
    {
      state: orderStatus.state3[0],
      time: order.shipping_date,
      class: orderStatus.state3[1],
    },
    {
      state: orderStatus.state4[0],
      time: order.finish_date,
      class: orderStatus.state4[1],
    },
  ]

  // 結算欄位
  const orderResult = [
    {
      result: '數量',
      sum: `${TotalAmount} / 個`,
    },
    {
      result: '小計',
      sum: `NT$ ${TotalPrice}`,
    },
    {
      result: '運費',
      sum: `NT$ ${order.shipping_fee}`,
    },
    {
      result: '優惠',
      sum: `NT$ ${order.discount_price}`,
    },
  ]
  // 結算欄位
  const receiver = [
    {
      info: '收件人 :',
      data: order.receiver_name,
    },
    {
      info: '連絡電話 :',
      data: order.receiver_phone,
    },
    {
      info: '收件地址 :',
      data: order.receiver_address,
    },
  ]

  return (
    <>
      {/* 桌機板 */}
      <div className={'p-3 d-none d-lg-block border border-dark'}>
        <div className={'d-none d-lg-flex align-items-center'}>
          <span className={'col-4'}>{order.tracking_number}</span>
          <div
            className={
              'col-8 d-flex justify-content-between order-nav align-items-center'
            }
          >
            {OrderTbody.map((tr, i) => (
              <div className={'text-center'} key={i}>
                {tr}
              </div>
            ))}
            <button
              className={`text-center border border-dark py-1 order-open ${
                openDetail ? 'active' : ''
              }`}
              onClick={() => {
                openDetail ? setOpenDetail(false) : setOpenDetail(true)
              }}
            >
              {openDetail ? '收起明細' : '展開明細'}
              {openDetail ? <FaAngleUp /> : <FaAngleDown />}
            </button>
          </div>
        </div>
      </div>
      {/* 手機版 */}
      <div className={'p-3 border-bottom border-dark d-lg-none'}>
        <div className={'row'}>
          <div className={'d-flex py-2'}>
            <div className="">{order.tracking_number}</div>
          </div>
          {OrderTbodyRWD.map((v, i) => (
            <div className={'d-flex justify-content-between py-2'} key={i}>
              <div>{v.title} </div>
              <div>{v.value}</div>
            </div>
          ))}
          <div className={'text-center d-flex'}>
            <button
              className={
                'border border-dark col-12 order-open ' +
                (openDetail ? 'active' : '')
              }
              onClick={() => {
                openDetail ? setOpenDetail(false) : setOpenDetail(true)
              }}
            >
              {openDetail ? '收起明細' : '展開明細'}
              {openDetail ? <FaAngleUp /> : <FaAngleDown />}
            </button>
          </div>
        </div>
      </div>
      <div
        ref={contentRef}
        className={'order-close ' + (openDetail ? 'active' : '')}
      >
        <div className={'p-2 border-top border-bottom border-dark'}>
          <div className="border border-dark d-flex order-state align-items-end">
            {/* 訂單狀態管理 */}
            {OrderStatus.map((v, i) => (
              <div
                className={
                  'd-flex flex-column justify-content-center col-3 pt-1'
                }
                key={i}
              >
                <div className="text-center">{v.state}</div>
                <div className="text-center data py-1">
                  {v.time && v.state !== '-----'
                    ? v.time
                    : '---------- --:--:--'}
                </div>
                <div className={`p-1 border ${v.class}`}></div>
              </div>
            ))}
          </div>
        </div>
        {/* 明細列表 */}
        {orderItem.map((v, i) => {
          return <OrderItems key={i} order={v} />
        })}
        {/* 收件資料 */}
        <div className={'p-2 border-bottom border-dark d-flex flex-wrap'}>
          <div
            className={
              'col-12 col-lg-6 border border-dark p-2 d-flex flex-column justify-content-around'
            }
          >
            {receiver.map((v, i) => (
              <div className={'d-flex p-2'} key={i}>
                <span className={'col-4'}>{v.info}</span>
                <span className={'col-8 text-end'}>{v.data}</span>
              </div>
            ))}
          </div>
          {/* 結算 */}
          <div className={'col-12 col-lg-6 border border-dark p-2'}>
            {orderResult.map((v, i) => (
              <div className="d-flex justify-content-between p-2" key={i}>
                <span>{v.result}</span>
                <span className={v.result === '優惠' ? 'text-danger' : ''}>
                  {v.sum}
                </span>
              </div>
            ))}
            <hr />
            <div className="d-flex justify-content-between p-2">
              <span>合計</span>
              <span className={'orange-text h5'}>NT${SubTotal}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
