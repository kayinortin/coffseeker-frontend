import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import Swal from 'sweetalert2'
import Link from 'next/link'
import Image from 'next/image'
import FavIconC from '../FavIconC'
import useAddCartCourse from '@/hooks/useCourseAddCart'


export default function CourseTopHitsCard(props) {
  const { addCartCourse } = useAddCartCourse(props.course)
  const { course } = props
  const { id, course_image, course_name, course_price, course_description } =
    course

  const isDesktop = useMediaQuery({ query: '(min-width: 768px)' })

  const handleShow = (e) => {
    if (!isDesktop) {
      e.preventDefault()
    }
  }

  return (
    <>
      <div key={id} className="card ed-border-none">
        <Link
          className="ed-border-card01"
          href={`/course/${id}`}
          onClick={handleShow}
        >
          <img
            src={`/${course_image}`}
            alt={course_name}
            className="card-img-top"
          />
        </Link>
        <FavIconC size="medium" type="icon" id={id} />
        <div className="card-body ed-card-body">
          <h5 className="card-title ed-card-title">{course_name}</h5>
          <h6 className="card-title ed-card-description hw-description-text">
            {course_description}
          </h6>
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="ed-card-price">NT${course_price}</h6>
            <div className="d-flex justify-content-between align-items-center">
              <button className="ed-addCart" onClick={addCartCourse}>
                加入購物車
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
