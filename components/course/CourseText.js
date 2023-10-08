import { useState } from 'react'
import { BreadCrumbs, BreadCrumbsMobile } from './BreadCrumbs'
import { AddCartBtn, BuyBtn } from './BuyBtn'
import style from '@/styles/_course.module.scss'
import Rating from './Rating'
import Score from './Score'
import CoursePerFetcher from './CoursePerFetcher'
import { useCourses } from '@/context/course'

export default function CourseText(props) {
  const { course, pid } = props
  const { CoursesData } = useCourses()

  return (
    <>
      {CoursesData && CoursesData.course_image ? (
        <div className="m-2 col-10 col-sm-6 mx-auto ms-sm-5">
          <div className="d-none d-sm-block">
            <BreadCrumbs />
          </div>

          <h5>{CoursesData.course_name}</h5>
          <Score />
          <h5 className={`mb-4 ed-detail-price ${style['price']}`}>
            NT${CoursesData.course_price}
          </h5>
          <div className="d-flex  align-items-center d-sm-none">
            <AddCartBtn course={CoursesData} />
            <BuyBtn />
          </div>

          <div className="  ">
            <p className="my-4">【教師姓名】：{CoursesData.teacher_name}</p>
            <p className="lh-base">
              【課程介紹】：
              {CoursesData.course_description}
            </p>
          </div>
          <div className=" px-2 py-1 ms-auto">
            <div className="d-none d-sm-block">
              <AddCartBtn course={CoursesData} />
              <BuyBtn />
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-5 mx-auto fs-3">課程籌備中,請敬請期待</div>
      )}
      <CoursePerFetcher pid={pid} />
    </>
  )
}
