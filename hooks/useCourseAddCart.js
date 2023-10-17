import { useState } from 'react'
import Swal from 'sweetalert2'

import { useCartListCourse } from '@/context/cart_course'

export default function useAddCartCourse(course) {
  const [number, setNumber] = useState(1)
  const { cartListData_course, setCartListData_course } = useCartListCourse()
  //========================cartListData_course是否被污染以及傳入購物車後的變數資料型別是否為正確

  const addCartCourse = (course) => {
    const itemInCart = cartListData_course.some((item) => item.id === course.id)

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

    if (itemInCart) {
      Toast.fire({
        icon: 'info',
        title: '此商品已加入購物車',
        customClass: {
          popup: 'ed-alert__toast',
          title: 'ed-alert__subtitle',
        },
      })
      return
    }

    Toast.fire({
      icon: 'success',
      title: '商品已加入購物車',
      customClass: {
        popup: 'ed-alert__toast',
        title: 'ed-alert__subtitle',
      },
    })

    const newItem = {
      id: course.id,
      name: course.course_name,
      image_main: course.course_image,
      price: course.course_price,
      discountPrice: course.discountPrice,
      description: course.course_description,
      amount:1
    }

    const newItemData = [...cartListData_course, newItem]

    for (let i = 0; i < cartListData_course.length; i++) {
      if (cartListData_course[i].id === newItem.id) {
        const newAmountItem = {
          id: cartListData_course[i].id,
          name: cartListData_course[i].name,
          image_main: cartListData_course[i].image_main,
          price: cartListData_course[i].price,
          discountPrice: cartListData_course[i].discountPrice,
          description: cartListData_course[i].description,
          amount:1
        }
        console.log(newAmountItem)
        const oldCartListData = cartListData.filter(
          (item, i) => item.id !== newItem.id
        )
        const newCartListData = [...oldCartListData, newAmountItem]

        setCartListData_course(newCartListData)
        return localStorage.setItem('cartList_course', JSON.stringify(newCartListData))
      }
    }

    if (cartListData_course.length !== 0) {
        setCartListData_course(newItemData)
      localStorage.setItem('cartList_course', JSON.stringify(newItemData))
    } else {
        setCartListData_course([newItem])
      localStorage.setItem('cartList_course', JSON.stringify([newItem]))
    }
  }
  return { addCartCourse, number, setNumber }
}
