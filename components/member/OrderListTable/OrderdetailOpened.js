import React, { useEffect, useRef, useState } from 'react'
import { FaAngleDown } from 'react-icons/fa'
import { FaAngleUp } from 'react-icons/fa'
import OrderItems from './OrderItems'

// 1010 尚未完成
// 1.針對訂單編號取得該訂單下訂的所有商品資訊
// 2.透過判斷讓展開明細可以看到訂單進度變化
// 3.訂單日期只顯示到日期 不顯示時間

export default function OrderDetailOpened({ order }) {
  const [openDetail, setOpenDetail] = useState(false)
  const contentRef = useRef(null)

  useEffect(() => {
    if (openDetail) {
      // 计算内容的高度并将其应用到元素上
      const contentHeight = contentRef.current.scrollHeight
      contentRef.current.style.height = `${contentHeight}px`
    } else {
      // 关闭时将高度设置为0
      contentRef.current.style.height = '0px'
    }
  }, [openDetail])

  const OrderItem = [
    {
      img: '/course-image/coffeeImg_1.jpg',
      discraption: '想望咖啡【獨家風味】蒙馬特的午後咖啡豆 100g/莓果/酒感',
      type: '莓果/200g',
      count: '10/包',
      price: 100,
    },
    {
      img: '/course-image/coffeeImg_1.jpg',
      discraption: '想望咖啡【獨家風味】蒙馬特的午後咖啡豆 200g/葡萄/酒感',
      type: '葡萄/200g',
      count: '10/包',
      price: 200,
    },
    {
      img: '/course-image/coffeeImg_1.jpg',
      discraption: '想望咖啡【獨家風味】蒙馬特的午後咖啡豆 200g/蘋果/酒感',
      type: '蘋果/200g',
      count: '10/包',
      price: 300,
    },
    {
      img: '/course-image/coffeeImg_1.jpg',
      discraption: '想望咖啡【獨家風味】蒙馬特的午後咖啡豆 200g/檸檬/酒感',
      type: '檸檬/200g',
      count: '10/包',
      price: 400,
    },
  ]

  return (
    <>
      {/*  */}
      <div className={'p-3 d-none d-lg-block'}>
        {/*  */}
        <div className={'d-none d-lg-flex align-items-center'}>
          <span className={'col-4 text-center'}>{order.tracking_number}</span>
          <div
            className={
              'col-8 d-flex justify-content-between order-nav align-items-center'
            }
          >
            <div className="text-center">{order.order_date}</div>
            <div className="text-center">NT${order.total_price}</div>
            <div className="text-center">{order.order_status}</div>
            <div className="text-center">{order.payment_method}</div>
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
            <div className="ps-3">{order.tracking_number}</div>
          </div>
          <div className={'d-flex justify-content-between py-2'}>
            <div>訂單日期 : </div>
            <div>{order.order_date}</div>
          </div>
          <div className={'d-flex justify-content-between py-2'}>
            <div>訂單總額 : </div>
            <div>NT${order.total_price}</div>
          </div>
          <div className={'d-flex justify-content-between py-2'}>
            <div>訂單狀態 : </div>
            <div>{order.order_status}</div>
          </div>
          <div className={'d-flex justify-content-between py-2'}>
            <div>付款方式 : </div>
            <div>{order.payment_method}</div>
          </div>
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
      {/*  */}

      <div
        ref={contentRef}
        className={
          'border-bottom border-dark order-close ' +
          (openDetail ? 'active' : '')
        }
      >
        <div className={'p-2'}>
          <div className="border border-dark d-flex order-state align-items-end">
            <div
              className={'d-flex flex-column justify-content-center col-3 pt-1'}
            >
              <div className="text-center">已下訂</div>
              <div className="text-center data py-1">2023-08-29 11:24</div>
              <div className="p-1 border orange"></div>
            </div>
            <div
              className={'d-flex flex-column justify-content-center col-3 pt-1'}
            >
              <div className="text-center">未理貨</div>
              <div className="text-center data py-1">---------- --:--</div>
              <div className="p-1 border gray"></div>
            </div>
            <div
              className={'d-flex flex-column justify-content-center col-3 pt-1'}
            >
              <div className="text-center">未出貨</div>
              <div className="text-center data py-1">---------- --:--</div>
              <div className="p-1 border gray"></div>
            </div>
            <div
              className={'d-flex flex-column justify-content-center col-3 pt-1'}
            >
              <div className="text-center">未完成</div>
              <div className="text-center data py-1">---------- --:--</div>
              <div className="p-1 border gray"></div>
            </div>
          </div>
        </div>
        {/*  */}
        {OrderItem.map((v, i) => {
          return <OrderItems key={i} order={v} />
        })}
        {/*  */}
        <div className={'p-2 border'}>
          <div className={'border border-dark p-2'}>
            <div className="d-flex justify-content-between p-2">
              <span>商品</span>
              <span>4 / 項</span>
            </div>
            {/*  */}
            <div className="d-flex justify-content-between p-2">
              <span>小計</span>
              <span>NT$ 2380</span>
            </div>
            {/*  */}
            <div className="d-flex justify-content-between p-2">
              <span>運費</span>
              <span>0</span>
            </div>
            {/*  */}
            <div className="d-flex justify-content-between p-2">
              <span>優惠</span>
              <span className={'text-danger'}>-380</span>
            </div>
            {/*  */}
            <hr />
            <div className="d-flex justify-content-between p-2">
              <span>合計</span>
              <span className={'orange-text'}>NT${order.total_price}</span>
            </div>
            {/*  */}
          </div>
        </div>
      </div>
      {/* {openDetail ? (
      ) : null} */}
    </>
  )
}
