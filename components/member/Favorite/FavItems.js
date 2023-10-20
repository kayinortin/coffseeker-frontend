import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useMediaQuery } from 'react-responsive'

import { useShow } from '@/context/showProductDetail'

import ProductDetailMobile from '@/components/product/productDetailMobile'

export default function FavItems({ data, type, handleRemove }) {
  let id, imgUrl, name, price, addedFavDate, itemLink

  if (type === 'product') {
    id = data.id
    imgUrl = `http://localhost:3005/uploads/${data.image_main}`
    name = data.name
    price = data.price
    addedFavDate = data.addedFavDate
    itemLink = `/product/${id}`
  } else {
    id = data.id
    imgUrl = `/${data.course_image}`
    name = data.course_name
    price = data.course_price
    addedFavDate = data.addedFavDate
    itemLink = `/course/${id}`
  }

  const { show, setShow } = useShow()
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' })

  const handleLinkClick = (e) => {
    if (isMobile) {
      e.preventDefault()
    }
  }

  const handleViewDetail = () => {
    setShow((prev) => ({
      ...prev,
      in: true,
      selectedPid: data.id,
    }))
  }

  const handleItemClick = (e) => {
    if (type === 'product') {
      handleLinkClick(e)
      handleViewDetail()
    }
  }

  return (
    <>
      <div className={'d-lg-flex border-bottom border-dark p-4 p-lg-2'}>
        <div className={'col-12 col-lg-7 d-flex'}>
          <div className="col-4 justify-content-center d-flex align-items-center">
            <Image
              src={imgUrl}
              alt="Image Description"
              width={100}
              height={100}
              style={{
                width: '100px',
                height: '100px',
                objectFit: 'cover',
                border: '5px solid #dfd0af',
              }}
            />
          </div>
          <div className="ps-3 col-8 d-flex align-items-center lh-base">
            <span>{name}</span>
          </div>
        </div>
        <div
          className={
            'col-12 col-lg-5 d-lg-flex justify-content-between align-items-center'
          }
        >
          <div className="col d-flex justify-content-between text-center py-3">
            <span className=" d-lg-none ">單價：</span>
            <span className="col-lg-12 ">NT${price}</span>
          </div>
          <div className="col d-flex justify-content-between text-center py-3">
            <span className=" d-lg-none ">加入時間：</span>
            <span className="col-lg-12 ">{addedFavDate.split(' ')[0]}</span>
          </div>
          <span className="col text-center flex-lg-column ps-lg-3 d-flex justify-content-between">
            <Link
              className="rj_FavBtn mb-lg-3 col-5 col-lg-12 py-2"
              href={itemLink}
              onClick={handleItemClick}
            >
              前往查看
            </Link>
            {isMobile && show.in && (
              <ProductDetailMobile
                pid={show.selectedPid}
                onClose={() => setShow((prev) => ({ ...prev, in: false }))}
              />
            )}
            <button
              className="rj_FavBtn col-5 col-lg-12 py-2"
              onClick={() => {
                handleRemove(id)
              }}
            >
              移除收藏
            </button>
          </span>
        </div>
      </div>
    </>
  )
}
