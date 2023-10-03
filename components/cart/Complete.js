import React from 'react'

export default function Complete({ step, handleNextStep, setStep }) {
  const handleCheckout = () => {
    if (handleNextStep) {
      handleNextStep()
    }
    setStep(3)
  }

  return (
    <>
      <h1>Complete Order</h1>
      <button className="btn btn-danger" onClick={handleCheckout}>
        完成訂單
      </button>
    </>
  )
}
