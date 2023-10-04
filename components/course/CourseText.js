import React from 'react'
import { BreadCrumbs, BreadCrumbsMobile } from './BreadCrumbs'
import CourseInfoBtn from './CourseInfoBtn'
import { AddCartBtn, BuyBtn } from './BuyBtn'
import style from '@/styles/_course.module.scss'
import data from '@/data/course/course[pid].json'
import { useRouter } from 'next/router'
import Rating from './Rating'
import Score from './Score'
// import

export default function CourseText() {
  const router = useRouter()
  const { pid } = router.query
  const courseData = data.course[pid] || {
    image: '',
    name: 'Default Course Name',
  }

  // console.log(courseData)
  const { image, name, price } = courseData
  return (
    <div className="m-2 col-10 col-sm-6 mx-auto ms-sm-5">
      <div className="d-none d-sm-block">
        <BreadCrumbs name={name} />
      </div>

      <h3>{name}</h3>
      <Score />
      <h5 className={style['price']}>NT${price}</h5>
      <div className="d-flex justify-content-around d-sm-none">
        <AddCartBtn />
        <BuyBtn />
      </div>
      <div className="d-sm-none">
        <CourseInfoBtn />
      </div>

      <div className="  ">
        <p>【教師姓名】：ＸＸＸ</p>
        <p>
          【課程介紹】：
          我們的咖啡課程為您帶來深入的咖啡文化，從豆子到杯中的風味，豐富您的咖啡知識並提升品味技能。加入我們，探索咖啡的奧秘！
        </p>
      </div>
      <div className="w-25 px-2 py-1 ms-auto">
        <div className="d-none d-sm-block">
          <BuyBtn />
        </div>
      </div>
    </div>
  )
}
