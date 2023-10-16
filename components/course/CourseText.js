import { useState, useEffect } from 'react'
import { BreadCrumbs, BreadCrumbsMobile } from './BreadCrumbs'
import { AddCartBtn, BuyBtn, MobileDetailsBtns, DetailsAddCart } from './BuyBtn'
import style from '@/styles/_course.module.scss'
import Score from './Score'
import CoursePerFetcher from './CoursePerFetcher'
import { selectedCourse, useCourses } from '@/context/course'
import { useShow } from '../../context/showProductDetail'
import { useCategory } from '@/context/category'
import { useCartList } from '@/context/cart'



export default function CourseText(props) {
  const { course, pid } = props
  const {selectedCourse, setSelectedCourse}=useCourses()

  const { show, setShow } = useShow()
  const { cartListData, setCartListData } = useCartList()
  const { categoryData } = useCategory()
  const [category, setCategory] = useState({ id: '', name: '' })
  

  return (
    <>
      {selectedCourse && selectedCourse.course_name ? (
        <div className="m-2 col-11 col-sm-7 mx-auto ms-sm-5 d-flex flex-column justify-content-around">
          <div className="d-none d-sm-block">
            <BreadCrumbs />
          </div>

          <h5 className="ed-detail-title">{selectedCourse.course_name}</h5>
          <Score />
          <h5 className={`mb-4 ed-detail-price ${style['price']}`}>
            NT{selectedCourse.course_price}
          </h5>
          <div className="d-block  d-sm-none">
            <MobileDetailsBtns course={selectedCourse} />
          </div>

          <div className="  ">
            <p className="my-4 ed-detail__item">
              【教師姓名】：{selectedCourse.teacher_name}
            </p>
            <p className="lh-base ed-detail__item">
              【課程介紹】：
              {selectedCourse.course_description}
            </p>
          </div>
          <div className="d-none d-sm-flex justify-content-between align-items-center">
            <DetailsAddCart course={selectedCourse} />
            <a href="http://localhost:3000/cart">
              <button className="ms-4 ed-addCart__check">立即結帳</button>
            </a>
          </div>
        </div>
      ) : (
        <div className="mt-5 mx-auto fs-3">課程籌備中,請敬請期待</div>
      )}
      <CoursePerFetcher pid={pid} />
    </>
  )
}
