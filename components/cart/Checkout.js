// Checkout.js
import React from 'react'

export default function Checkout({ step, handleNextStep, setStep }) {
  const handleCheckout = () => {
    if (handleNextStep) {
      handleNextStep() // 調用父組件的處理函數，切換到下一步
    }
    setStep(3) // 切換到第三步
  }

  return (
    <>
      <h1>checkout order</h1>
      <button className="btn btn-danger" onClick={handleCheckout}>
        送出訂單
      </button>
    </>
  )
}
