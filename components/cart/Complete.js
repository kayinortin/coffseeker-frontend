import React from 'react'

export default function Complete({ step, handleNextStep, setStep }) {
  const handleCompleteOrder = () => {
    if (handleNextStep) {
      handleNextStep()
    }
  }

  return (
    <>
      <h1>Complete Order</h1>
      <button className="btn btn-danger" onClick={handleCompleteOrder}>
        完成訂單
      </button>
    </>
  )
}
