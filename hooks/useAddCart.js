import { useState } from 'react'
import Swal from 'sweetalert2'

import { useCartList } from '@/context/cart'

export default function useAddCart(product) {
  const [number, setNumber] = useState(1)
  const { cartListData, setCartListData } = useCartList()

  const addCart = () => {
    const itemInCart = cartListData.some((item) => item.id === product.id)

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
        iconColor:'#1C262C',
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
      iconColor:'#b54b33',
      customClass: {
        popup: 'ed-alert__toast',
        title: 'ed-alert__subtitle',
      },
    })

    const newItem = {
      id: product.id,
      name: product.name,
      image_main: product.image_main,
      price: product.price,
      discountPrice: product.discountPrice,
      description: product.description,
      amount: number,
    }

    const newItemData = [...cartListData, newItem]

    for (let i = 0; i < cartListData.length; i++) {
      if (cartListData[i].id === newItem.id) {
        const newAmountItem = {
          id: cartListData[i].id,
          name: cartListData[i].name,
          image_main: cartListData[i].image_main,
          price: cartListData[i].price,
          discountPrice: cartListData[i].discountPrice,
          description: cartListData[i].description,
          amount: cartListData[i].amount + newItem.amount,
        }
        const oldCartListData = cartListData.filter(
          (item, i) => item.id !== newItem.id
        )
        const newCartListData = [...oldCartListData, newAmountItem]

        setCartListData(newCartListData)
        return localStorage.setItem('cartList', JSON.stringify(newCartListData))
      }
    }

    if (cartListData.length !== 0) {
      setCartListData(newItemData)
      localStorage.setItem('cartList', JSON.stringify(newItemData))
    } else {
      setCartListData([newItem])
      localStorage.setItem('cartList', JSON.stringify([newItem]))
    }
  }
  return { addCart, number, setNumber }
}
