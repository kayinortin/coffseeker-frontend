import React from 'react'
import Image from 'next/image'
import data from '@/data/course/course.json'
import style from '@/styles/_course.module.scss'
import { AddCartBtn, BuyBtn } from './BuyBtn'

export default function Card({
  name,
  image,
  price,
  start_date,
  end_date,
  capacity,
}) {
  return (
    <div
      style={{ width: '288px' }}
      className="d-flex py-3  flex-column align-items-center m-3"
    >
      <div className={` ${style['img-bg']}`}>
        <Image
          src={`/course-image/${image}`}
          alt={name}
          width={250}
          height={250}
          className="m-2"
        />
      </div>

      <div className="d-flex w-100 my-3 ms-5 justify-content-start">
        <h5 className="fs-5">{name}</h5>
      </div>
      <div className="d-flex w-100 align-items-center justify-content-around">
        <p className={`my-auto fs-6 ${style['price']}`}>價格: ${price}</p>
        <AddCartBtn />
      </div>
    </div>
  )
}
