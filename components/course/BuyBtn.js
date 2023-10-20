import React from 'react'
import Swal from 'sweetalert2'
import Link from 'next/link'

import { useCartListCourse } from '@/context/cart_course'

function AddCartBtn(props) {
  const { cartListData_course, setCartListData_course } = useCartListCourse()
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

    if (cartListData_course.some((item) => item.id === newItem.id)) {
      const updatedCartList = cartListData_course.map((item) =>
        item.id === newItem.id ? newItem : item
      )
      setCartListData_course(updatedCartList)
      localStorage.setItem('cartList_course', JSON.stringify(updatedCartList))
    } else {
      const updatedCartList = [...cartListData_course, newItem]
      setCartListData_course(updatedCartList)
      localStorage.setItem('cartList_course', JSON.stringify(updatedCartList))
    }
  }

  return (
    <div className="text-center text-white">
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
        href="/cart"
        className="text-white ed-addCart__detail  text-center"
      >
        立即結帳
      </Link>
    </div>
  )
}

function DetailsAddCart(props) {
  const { cartListData_course, setCartListData_course } = useCartListCourse()
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

    if (cartListData_course.some((item) => item.id === newItem.id)) {
      const updatedCartList = cartListData_course.map((item) =>
        item.id === newItem.id ? newItem : item
      )
      setCartListData_course(updatedCartList)
      localStorage.setItem('cartList_course', JSON.stringify(updatedCartList))
    } else {
      const updatedCartList = [...cartListData_course, newItem]
      setCartListData_course(updatedCartList)
      localStorage.setItem('cartList_course', JSON.stringify(updatedCartList))
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
  const { cartListData_course, setCartListData_course } = useCartListCourse()
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

    if (cartListData_course.some((item) => item.id === newItem.id)) {
      const updatedCartList = cartListData_course.map((item) =>
        item.id === newItem.id ? newItem : item
      )
      setCartListData_course(updatedCartList)
      localStorage.setItem('cartList_course', JSON.stringify(updatedCartList))
    } else {
      const updatedCartList = [...cartListData_course, newItem]
      setCartListData_course(updatedCartList)
      localStorage.setItem('cartList_course', JSON.stringify(updatedCartList))
    }
  }
  return (
    <div className="d-flex align-items-center justify-content-between">
      <button
        className="ed-addCart__detail-mobile d-flex align-items-center mt-3"
        onClick={addCart}
      >
        加入購物車
        <i className="fas fa-shopping-cart"></i>
      </button>
      <Link href="/cart">
        <button className="ms-1 ed-addCart__check">立即結帳</button>
      </Link>
    </div>
  )
}

export { AddCartBtn, BuyBtn, MobileDetailsBtns, DetailsAddCart }
