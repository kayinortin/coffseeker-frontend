import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import styles from '@/styles/_course.module.scss'
import Link from 'next/link'
import { useSwiper } from 'swiper/react'

import { useCartList } from '@/context/cart'

function AddCartBtn(props) {
  const { cartListData, setCartListData } = useCartList()
  const { course } = props

  const showToast = () => {
    const Toast = Swal.mixin({
      toast: true,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: false,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      },
    })

    Toast.fire({
      icon: 'success',
      title: '商品已加入購物車',
      customClass: {
        popup: 'c-alert__toast',
        title: 'c-alert__subtitle',
      },
    })
  }

  const addCart = () => {
    showToast()

    const newItem = {
      id: course.id,
      course_name: course.course_name,
      course_price: course.course_price,
      course_description: course.course_description,
      course_image: course.course_image,
    }

    if (cartListData.some((item) => item.id === newItem.id)) {
      const updatedCartList = cartListData.map((item) =>
        item.id === newItem.id ? newItem : item
      )
      setCartListData(updatedCartList)
      localStorage.setItem('cartList', JSON.stringify(updatedCartList))
    } else {
      const updatedCartList = [...cartListData, newItem]
      setCartListData(updatedCartList)
      localStorage.setItem('cartList', JSON.stringify(updatedCartList))
    }
  }

  return (
    <div className={`px-2 py-1 text-center text-white`}>
      <button className="ed-addCart" onClick={addCart}>
        加入購物車
      </button>
    </div>
  )
}

function BuyBtn() {
  return (
    <div className="">
      <Link
        href="http://localhost:3000/cart"
        className="text-white ed-addCart__detail  text-center"
      >
        立即結帳
      </Link>
    </div>
  )
}

function DetailsAddCart(props) {
  const { cartListData, setCartListData } = useCartList()
  const { course } = props

  const showToast = () => {
    const Toast = Swal.mixin({
      toast: true,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: false,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      },
    })

    Toast.fire({
      icon: 'success',
      title: '商品已加入購物車',
      customClass: {
        popup: 'c-alert__toast',
        title: 'c-alert__subtitle',
      },
    })
  }

  const addCart = () => {
    showToast()

    const newItem = {
      id: course.id,
      course_name: course.course_name,
      course_price: course.course_price,
      course_description: course.course_description,
      course_image: course.course_image,
    }

    if (cartListData.some((item) => item.id === newItem.id)) {
      const updatedCartList = cartListData.map((item) =>
        item.id === newItem.id ? newItem : item
      )
      setCartListData(updatedCartList)
      localStorage.setItem('cartList', JSON.stringify(updatedCartList))
    } else {
      const updatedCartList = [...cartListData, newItem]
      setCartListData(updatedCartList)
      localStorage.setItem('cartList', JSON.stringify(updatedCartList))
    }
  }
  return (
    <div className="d-flex align-items-center">
      <button
        className="ed-addCart__detail d-flex align-items-center mt-3"
        onClick={addCart}
      >
        加入購物車
        <i className="fas fa-shopping-cart"></i>
      </button>
    </div>
  )
}

function MobileDetailsBtns(props) {
  const { cartListData, setCartListData } = useCartList()
  const { course } = props

  const showToast = () => {
    const Toast = Swal.mixin({
      toast: true,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: false,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      },
    })

    Toast.fire({
      icon: 'success',
      title: '商品已加入購物車',
      customClass: {
        popup: 'c-alert__toast',
        title: 'c-alert__subtitle',
      },
    })
  }

  const addCart = () => {
    showToast()

    const newItem = {
      id: course.id,
      course_name: course.course_name,
      course_price: course.course_price,
      course_description: course.course_description,
      course_image: course.course_image,
    }

    if (cartListData.some((item) => item.id === newItem.id)) {
      const updatedCartList = cartListData.map((item) =>
        item.id === newItem.id ? newItem : item
      )
      setCartListData(updatedCartList)
      localStorage.setItem('cartList', JSON.stringify(updatedCartList))
    } else {
      const updatedCartList = [...cartListData, newItem]
      setCartListData(updatedCartList)
      localStorage.setItem('cartList', JSON.stringify(updatedCartList))
    }
  }
  return (
    <div className="d-flex align-items-center">
      <button
        className="ed-addCart__detail d-flex align-items-center mt-3"
        onClick={addCart}
      >
        加入購物車
        <i className="fas fa-shopping-cart"></i>
      </button>
      <a href="http://localhost:3000/cart">
        <button className="ms-4 ed-addCart__check">立即結帳</button>
      </a>
    </div>
  )
}

export { AddCartBtn, BuyBtn, MobileDetailsBtns, DetailsAddCart }
