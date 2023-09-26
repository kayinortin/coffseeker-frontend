import React from 'react'
import styles from '@/styles/_course.module.scss'
import Link from 'next/link'

function AddCartBtn() {
  return (
    <div className={`px-2 py-1 text-white ${styles['btn-add']}`}>
      加入購物車
    </div>
  )
}

function BuyBtn() {
  return (
    <div className={`${styles['btn-check']} text-center px-2 py-1  `}>
      <Link href="http://localhost:3000/cart" className="text-white">
        立即結帳
      </Link>
    </div>
  )
}

export { AddCartBtn, BuyBtn }
