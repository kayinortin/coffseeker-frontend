import React from 'react'
import Step from '@/components/cart/step'
import CartList from '@/components/cart/CartList'

function Cart() {
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

export default Cart
