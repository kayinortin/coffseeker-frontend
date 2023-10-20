import React, { useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function Complete({ step, handleNextStep, setStep }) {
  useEffect(() => {
    localStorage.clear()
  }, [])

  const handleCompleteOrder = () => {
    if (handleNextStep) {
      handleNextStep()
    }
  }

  return (
    <>
      <div>
        <Head>
          <title>購物車｜成立訂單</title>
        </Head>
      </div>
      <div className="complete text-center">
        <div className="completeWrap">
          <img className="completeImg" src="/bg1.png" alt="購物車已送出訂單" />
          <div className="emptyTitle">已送出訂單</div>

          <Link href="/member/order-list">
            <button
              type="button"
              className="btn goshop"
              onClick={handleCompleteOrder}
            >
              查看訂單
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}
