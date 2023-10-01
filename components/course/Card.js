import React from 'react'
import Image from 'next/image'
import style from '@/styles/_course.module.scss'
import { AddCartBtn, BuyBtn } from './BuyBtn'
import Link from 'next/link'

export default function Card({ name, image, price, id }) {
  return (
    <div
      className={`${style['card']} d-flex py-3 flex-column align-items-center m-3`}
    >
      <div className={` ${style['img-bg']}`}>
        <Link href={`http://localhost:3000/course/${id}`}>
          <Image
            src={`http://localhost:3000/course-image/${image}`}
            alt={name}
            width={250}
            height={250}
            className="m-2"
          />
        </Link>
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
