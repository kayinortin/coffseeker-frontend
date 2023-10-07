import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import Skeleton from '@mui/material/Skeleton'
import Link from 'next/link'
import Image from 'next/image'

import { useShow } from '@/context/showProductDetail'
import { useCategory } from '@/context/category'
import { useCartList } from '@/context/cart'

import FavIcon from '../FavIcon'

export default function ProductItem(props) {
  const [number, setNumber] = useState(1)
  const { product } = props
  const {
    id,
    image_main,
    name,
    brand,
    amount,
    price,
    discountPrice,
    views,
    popularity,
  } = product
  const { show, setShow } = useShow()
  const { categoryData } = useCategory()
  const { cartListData, setCartListData } = useCartList()
  const [category, setCategory] = useState({ id: '', name: '' })

  const isFetchingCategory = categoryData.length === 0

  const handleShow = () => {
    setShow({ ...setShow, in: true })
  }

  useEffect(() => {
    if (!isFetchingCategory) {
      const matchedCategory = categoryData.find(
        (category) => product.category_id === category.id
      )
      setCategory({ ...matchedCategory })
    }
  }, [categoryData])

  //加入購物車
  const addCart = () => {
    //加入購物車alert
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

    const newItem = {
      id: product.id,
      name: product.name,
      image: product.image,
      image_main: product.image_main,
      price: product.price,
      discountPrice: product.discountPrice,
      amount: number,
    }

    const newItemData = [...cartListData, newItem]

    for (let i = 0; i < cartListData.length; i++) {
      if (cartListData[i].id === newItem.id) {
        const newAmountItem = {
          id: cartListData[i].id,
          name: cartListData[i].name,
          image: cartListData[i].image,
          price: cartListData[i].price,
          discountPrice: cartListData[i].discountPrice,
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

  return (
    <>
      <div className="card ed-border-none">
        <Link
          className="ed-border-card01"
          href={`/product/${id}`}
          onClick={handleShow}
        >
          <Image
            src={`http://localhost:3005/uploads/${image_main}`}
            alt={name}
            className="card-img-top"
            width={300}
            height={250}
          />
        </Link>
        <FavIcon size="medium" type="icon" id={id} />
        <div className="card-body ed-card-body">
          <h5 className="card-title ed-card-title">
            <p>精選品牌 &gt; {brand}</p>
            {name}
          </h5>
          <p className="ed-card-origin-price">NT${price}</p>
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="ed-card-price">NT${discountPrice}</h6>
            <div className="d-flex justify-content-between align-items-center">
              <button className="ed-addCart" onClick={addCart}>
                加入購物車
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
