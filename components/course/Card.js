import React from 'react'
import Image from 'next/image'
import data from '@/data/course/course.json'
import CTAButton from '../common/cta-button'
import { width } from '@mui/system'
import style from '@/styles/_course.module.scss'

export default function Card({
  name,
  image,
  price,
  start_date,
  end_date,
  capacity,
  description,
}) {
  return (
    <div className="card">
      <Image
        src={`/course-image/${image}`}
        className="card-img-top"
        alt="..."
        width={100}
        height={100}
      />
      <div className="card-body">
        <h5>{name}</h5>
        <p>價格: {price}</p>
        <p>課程開始日期: {start_date}</p>
        <p>課程結束日期: {end_date}</p>
        <p>人數: {capacity}</p>
        {/* <p>描述: {description}</p> */}
        <CTAButton />
      </div>
    </div>
  )
}
