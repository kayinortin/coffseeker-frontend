import React from 'react'
import Step from '@/components/cart/step'
import CartList from '@/components/cart/CartList'

export default function Cart() {
  return (
    <>
      <div className={'background'}>
        <div className={'container'}>
          <Step />
          <CartList />
        </div>
      </div>
    </>
  )
}
