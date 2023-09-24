import React from 'react'
import Image from 'next/image'
import data from '@/data/course/course.json'
import CTAButton from '../common/cta-button'
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
    <div className="card my-3">
      <Image
        src={`/course-image/${image}`}
        className="card-img-top"
        alt="..."
        width={50}
        height={230}
      />
      <div className="card-body">
        <h5>{name}</h5>
        <p>
          課程日期: {start_date} 至 {end_date}
        </p>
        {/* <p>課程結束日期: </p> */}
        <p>人數: {capacity}</p>
        <div className="d-flex justify-content-between">
          <p className={`${style['price']} fs-4 my-auto`}>NT$: {price}</p>
          <AddCartBtn />
        </div>
      </div>
    </div>
  )
}
