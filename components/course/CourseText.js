import React from 'react'
import BreadCrumbs from './BreadCrumbs'
import { BuyBtn } from './BuyBtn'
import style from '@/styles/_course.module.scss'
import data from '@/data/course/course[pid].json'
import { useRouter } from 'next/router'

export default function CourseText() {
  const router = useRouter()
  const { pid } = router.query
  const courseData = data.course[pid] || {
    image: '',
    name: 'Default Course Name',
  }

  console.log(courseData)
  const { image, name, price } = courseData
  return (
    <div className="m-2 ms-5">
      <BreadCrumbs className="m-2" />
      <h3>{name}</h3>
      <h5 className={style['price']}>NT${price}</h5>
      <div className="mt-5 col-8 ">
        <p>【教師姓名】：ＸＸＸ</p>
        <p>
          【課程介紹】：
          我們的咖啡課程為您帶來深入的咖啡文化，從豆子到杯中的風味，豐富您的咖啡知識並提升品味技能。加入我們，探索咖啡的奧秘！
        </p>
      </div>
      <div className="w-25 px-2 py-1 ms-auto">
        <BuyBtn />
      </div>
    </div>
  )
}
