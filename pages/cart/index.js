import React, { useState } from 'react'
import Step from '@/components/cart/step'
import CartList from '@/components/cart/CartList'
import Checkout from '@/components/cart/Checkout'
import Complete from '@/components/cart/Complete'

export default function Cart() {
  const [step, setStep] = useState(1)

  // 處理下一步點擊事件
  const handleNextStep = () => {
    if (step === 1) {
      setStep(2)
    }
  }

  return (
    <>
      <div className={'background'}>
        <div className={'container'}>
          <Step currentStep={step} />
          {step === 1 && (
            <CartList
              step={step}
              handleNextStep={handleNextStep}
              setStep={setStep}
            />
          )}
          {step === 2 && <Checkout step={step} setStep={setStep} />}
          {step === 3 && <Complete step={step} setStep={setStep} />}
        </div>
      </div>
    </>
  )
}
