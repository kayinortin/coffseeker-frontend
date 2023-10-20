import React from 'react'
import { useMediaQuery } from 'react-responsive'
import Link from 'next/link'

import useAddCart from '@/hooks/useAddCart'

import FavIcon from '../FavIcon'

export default function ProductTopHits(props) {
  const { addCart } = useAddCart(props.product)
  const { product } = props
  const { id, image_main, name, brand, discountPrice, description } = product

  const isDesktop = useMediaQuery({ query: '(min-width: 768px)' })

  const handleShow = (e) => {
    if (!isDesktop) {
      e.preventDefault()
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
          <img
            src={`http://localhost:3005/uploads/${image_main}`}
            alt={name}
            className="card-img-top"
          />
        </Link>
        <FavIcon size="medium" type="icon" id={id} />
        <div className="card-body ed-card-body">
          <p className="ed-card-brand">精選品牌 &gt; {brand}</p>
          <h5 className="card-title ed-card-title">{name}</h5>
          <h6 className="card-title ed-card-description">{description}</h6>
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
