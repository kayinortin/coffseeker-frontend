import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useMediaQuery } from 'react-responsive'

import { useShow } from '@/context/showProductDetail'

import FavIcon from '../FavIcon'

export default function ProductItem(props) {
  const { product } = props
  const { id, image_main, name, brand, price, discountPrice } = product
  const { show, setShow } = useShow()

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
      <div className="col-12 col-md-4 my-3">
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
              onClick={handleClick}
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
                <Link href={`/product/${id}`} onClick={handleShow}>
                  <button className="ed-addCart" onClick={handleClick}>
                    查看商品
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
