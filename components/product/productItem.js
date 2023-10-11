import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useMediaQuery } from 'react-responsive'

import useAddCart from '@/hooks/useAddCart'

import { useShow } from '@/context/showProductDetail'
import { useCategory } from '@/context/category'
import { useCartList } from '@/context/cart'

import FavIcon from '../FavIcon'

export default function ProductItem(props) {
  const { addCart } = useAddCart(props.product)
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

  const isDesktop = useMediaQuery({ query: '(min-width: 768px)' })

  const handleShow = (e) => {
    if (!isDesktop) {
      e.preventDefault()
    }
  }
  const handleClick = () => {
    setShow({
      in: true,
      selectedPid: product.id,
    })
  }

  return (
    <>
      <div className="col-12 col-md-4 my-3" onClick={handleClick}>
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
              width={250}
              height={250}
            />
          </Link>
          <FavIcon size="medium" type="icon" id={id} />
          <div className="card-body ed-card-body">
            <p className="ed-card-brand">精選品牌 &gt; {brand}</p>
            <h5 className="card-title ed-card-title">{name}</h5>
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
      </div>
    </>
  )
}
