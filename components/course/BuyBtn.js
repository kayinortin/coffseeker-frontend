import React from 'react'
import styles from '@/styles/_course.module.scss'

function AddCartBtn() {
  return (
    <button className={`btn text-white ${styles['btn-add']}`}>
      加入購物車
    </button>
  )
}

function BuyBtn() {
  return <button className="btn btn-secondary btn-check">立即結帳</button>
}

export { AddCartBtn, BuyBtn }
