import React from 'react'
import styles from '@/styles/_course.module.scss'
import Link from 'next/link'
import { useSwiper } from 'swiper/react'

function AddCartBtn() {
  return (
    <div className={`px-2 py-1 text-center text-white ${styles['btn-add']}`}>
      <Link
        href="http://localhost:3000/cart"
        className="text-white d-block px-2 py-2"
      >
        加入購物車
      </Link>
    </div>
  )
}

function BuyBtn() {
  return (
    <div className={`${styles['btn-check']} text-center  px-2 py-1 `}>
      <Link
        href="http://localhost:3000/cart"
        className="text-white d-block px-2 py-2"
      >
        立即結帳
      </Link>
    </div>
  )
}

const SwiperNextBtn = ({ className, children }) => {
  const swiper = useSwiper()
  return (
    <button className={className} onClick={() => swiper.slideNext()}>
      {children}
    </button>
  )
}

const SwiperPrevBtn = ({ className, children }) => {
  const swiper = useSwiper()
  return (
    <button className={className} onClick={() => swiper.slidePrev()}>
      {children}
    </button>
  )
}

export { SwiperNextBtn, SwiperPrevBtn, AddCartBtn, BuyBtn }
