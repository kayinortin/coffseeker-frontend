import { BreadCrumbs } from './BreadCrumbs'
import { MobileDetailsBtns, DetailsAddCart } from './BuyBtn'
import style from '@/styles/_course.module.scss'
import Score from './Score'
import CoursePerFetcher from './CoursePerFetcher'
import { useCourses } from '@/context/course'
import Link from 'next/link'
import { useComment } from '@/context/comment'

export default function CourseText(props) {
  const { pid } = props
  const { selectedCourse } = useCourses()

  // 取得評論資訊
  const { comments } = useComment()
  // 計算平均評分
  let ratingSum = 0
  for (let i = 0; i < comments.length; i++) {
    ratingSum += comments[i].rating
  }
  let ratingAvg = ratingSum && comments.length ? ratingSum / comments.length : 3
  let roundedRating = Math.floor(ratingAvg)
  let hasHalfStar = ratingAvg - roundedRating >= 0.5 ? true : false

  const AerageStars = () => {
    return Array.from({ length: 5 }).map((_, index) => {
      let starClass = 'star'

      if (index < roundedRating) {
        starClass += ' active-star'
      } else if (index === roundedRating && hasHalfStar) {
        starClass += ' half-star'
      }

      return (
        <div key={index} className={starClass}>
          ★
        </div>
      )
    })
  }

  return (
    <>
      {selectedCourse && selectedCourse.course_name ? (
        <div className="m-2 col-11 col-sm-7 mx-auto ms-sm-5 d-flex flex-column justify-content-around">
          <div className="d-none d-sm-block">
            <BreadCrumbs />
          </div>

          <h5 className="ed-detail-title">{selectedCourse.course_name}</h5>
          <div className="rating-container my-3">{AerageStars()}</div>
          <h5 className={`mb-4 ed-detail-price ${style['price']}`}>
            NT{selectedCourse.course_price}
          </h5>
          <div className="d-block  d-sm-none">
            <MobileDetailsBtns course={selectedCourse} />
          </div>

          <div className="hw-course-detail">
            <p className="my-4 ed-detail__item hw-course-detail">
              【教師姓名】
              <br />
              <br /> {selectedCourse.teacher_name}
            </p>
            <p className="lh-lg ed-detail__item hw-course-detail">
              <p className="hw-course-detail">【課程介紹】</p>
              {selectedCourse.course_description}
            </p>
          </div>
          <div className="d-none d-sm-flex justify-content-between align-items-center">
            <DetailsAddCart course={selectedCourse} />
            <Link href="/cart">
              <button className="ms-4 ed-addCart__check">立即結帳</button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-5 mx-auto fs-3">課程籌備中,請敬請期待</div>
      )}
      <CoursePerFetcher pid={pid} />
    </>
  )
}
