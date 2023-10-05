import React, { useState } from 'react'
import { BreadCrumbs, BreadCrumbsMobile } from './BreadCrumbs'
import CourseInfoBtn from './CourseInfoBtn'
import { AddCartBtn, BuyBtn } from './BuyBtn'
import style from '@/styles/_course.module.scss'
import data from '@/data/course/course[pid].json'
import { useRouter } from 'next/router'
import Rating from './Rating'
import Score from './Score'
import CoursePerFetcher from './[pid]'

export default function CourseText() {
  const router = useRouter()
  const { pid } = router.query
  const [data, setData] = useState(null)

  const onDataFetched = (fetchedData) => {
    setData(fetchedData)
  }

  // console.log(courseData)

  return (
    <>
      {data && data.course_image.length > 0 ? (
        <div className="m-2 col-10 col-sm-6 mx-auto ms-sm-5">
          <div className="d-none d-sm-block">
            <BreadCrumbs name={name} />
          </div>

          <h3>{data.course_name}</h3>
          <Score />
          <h5 className={style['price']}>NT${data.course_price}</h5>
          <div className="d-flex justify-content-around d-sm-none">
            <AddCartBtn />
            <BuyBtn />
          </div>
          <div className="d-sm-none">
            <CourseInfoBtn />
          </div>

          <div className="  ">
            <p>【教師姓名】：{data.teacher_name}</p>
            <p>
              【課程介紹】：
              {data.course_description}
            </p>
          </div>
          <div className="w-25 px-2 py-1 ms-auto">
            <div className="d-none d-sm-block">
              <BuyBtn />
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-5 mx-auto fs-3">課程籌備中,請敬請期待</div>
      )}

      <CoursePerFetcher pid={pid} onCoursePerFetched={onDataFetched} />
    </>
  )
}
