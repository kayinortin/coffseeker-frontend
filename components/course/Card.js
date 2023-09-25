import React from 'react'
import Image from 'next/image'
import data from '@/data/course/course.json'
<<<<<<< HEAD
import CTAButton from '../common/cta-button'
=======
>>>>>>> upstream/dev
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
<<<<<<< HEAD
    <div className="card">
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
          <p className="text-success fs-5 my-auto">NT$: {price}</p>
          <AddCartBtn />
        </div>
=======
    // <div className="card course-card my-3">
    //   <Image
    //     src={`/course-image/${image}`}
    //     className="card-img-top"
    //     alt="..."
    //     width={50}
    //     height={230}
    //   />
    //   <div className="card-body">
    //     <h5>{name}</h5>
    //     <p>
    //       課程日期: {start_date} 至 {end_date}
    //     </p>
    //     {/* <p>課程結束日期: </p> */}
    //     <p>人數: {capacity}</p>
    //     <div className="d-flex justify-content-between">
    //       <p className={`${style['price']} fs-4 my-auto`}>NT$: {price}</p>
    //       <AddCartBtn />
    //     </div>
    //   </div>
    // </div>

    // const { imageSrc, title, price } = props;

    <div
      style={{ width: '288px' }}
      className="d-flex py-3 border flex-column align-items-center m-3"
    >
      <div className={`img-bg ${style['img-bg']}`}>
        <Image
          src={`/course-image/${image}`}
          alt={name}
          width={250}
          height={250}
          className="m-2"
        />
      </div>

      <div className="my-3">
        <h5>{name}</h5>
      </div>

      <div className="d-flex w-100 align-items-center justify-content-around">
        <p className={`my-auto fs-6 ${style['price']}`}>價格: ${price}</p>
        <AddCartBtn />
>>>>>>> upstream/dev
      </div>
    </div>
  )
}
