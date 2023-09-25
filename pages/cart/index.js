import React from 'react'
import Step from '@/components/cart/step'
import CartList from '@/components/cart/CartList'

export default function Cart() {
  return (
    <>
      <section className={'background'}>
        <div className={'container'}>
          <h1>購物車</h1>
          <Step />
          <CartList />
        </div>
      </section>
    </>
  )
}
