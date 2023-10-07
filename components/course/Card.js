import React from 'react'
import Image from 'next/image'
import style from '@/styles/_course.module.scss'
import { AddCartBtn, BuyBtn } from './BuyBtn'
import Link from 'next/link'

import { useCourses } from '@/context/course'

export default function Card(props) {
  const { course } = props

  return (
    <div
      className={`${style['card']} d-flex py-3 flex-column align-items-center m-3`}
    >
      <div className={`${style['img-bg']}`}>
        <Link href={`http://localhost:3000/course/${course?.id}`}>
          <img
            src={`http://localhost:3000/course-image/${course?.course_image}`}
            alt={course?.name}
            width={250}
            height={250}
            className="m-2"
          />
        </Link>
      </div>

      <div className="d-flex w-100 my-3 ms-5 justify-content-start">
        <h5 className="fs-5">{course?.name}</h5>
      </div>

      <div className="d-flex w-100 align-items-center justify-content-around">
        <p className={`my-auto fs-6 ${style['price']}`}>
          價格: ${course?.course_price}
        </p>

        <AddCartBtn course={course} />
      </div>
    </div>
  )
}
