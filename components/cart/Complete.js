import React, { useEffect } from 'react'
import Head from 'next/head'

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
          <button
            type="button"
            className="btn goshop"
            onClick={handleCompleteOrder}
          >
            <a href="http://localhost:3000/member/order-list">查看訂單</a>
          </button>
        </div>
      </div>
    </>
  )
}
