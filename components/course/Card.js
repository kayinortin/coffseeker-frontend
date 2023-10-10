import React from 'react'
import Image from 'next/image'
import style from '@/styles/_course.module.scss'
import { AddCartBtn, BuyBtn } from './BuyBtn'
import Link from 'next/link'
import FavIcon from '../FavIcon'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useShow } from '@/context/showProductDetail'

import { useFavorite } from '@/context/fav'

import { useCourses } from '@/context/course'

export default function Card(props) {
  const { course } = props

  const { show, setShow } = useShow()
  const handleShow = () => {
    setShow({ ...setShow, in: true })
  }

  return (
    <div
      className={`${style['card']} d-flex py-3 flex-column align-items-center m-3`}
    >
      <div className="card ed-border-none">
        <Link
          href={`http://localhost:3000/course/${course?.id}`}
          className="ed-border-card01"
          onClick={handleShow}
        >
          <img
            src={`http://localhost:3000/course-image/${course?.course_image}`}
            alt={course?.name}
            width={300}
            height={250}
            className="card-img-top object-fit-cover
            "
          />
          <FavIcon size="medium" type="icon" id={course?.id} />
        </Link>
      </div>

      <div className="d-flex w-100 my-3 justify-content-start">
        <h5 className="card-title ed-card-title">{course.course_name}</h5>
      </div>

      <div className="d-flex w-100 align-items-center justify-content-between">
        <h6 className={`my-auto ed-card-price ${style['price']}`}>
          ${course?.course_price}
        </h6>

        <AddCartBtn course={course} />
      </div>
    </div>
  )
}
