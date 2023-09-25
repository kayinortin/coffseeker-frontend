import React from 'react'
import styles from '@/styles/_course.module.scss'

function AddCartBtn() {
<<<<<<< HEAD
  return <button className="btn btn-primary">加入購物車</button>
}

function BuyBtn() {
  return <button className="btn btn-secondary">立即結帳</button>
=======
  return (
    <div className={`px-2 py-1 text-white ${styles['btn-add']}`}>
      加入購物車
    </div>
  )
}

function BuyBtn() {
  return <button className="btn btn-secondary btn-check">立即結帳</button>
>>>>>>> upstream/dev
}

export { AddCartBtn, BuyBtn }
