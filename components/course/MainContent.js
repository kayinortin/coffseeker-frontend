import { useState, useEffect } from 'react'
import CoursePic from '@/components/course/CoursePic'
import CourseText from '@/components/course/CourseText'
import Review from './Reviews'
// import CourseDescription from './CourseDescription'
import TopHits from './TopHits'
import style from '@/styles/_course.module.scss'
import { useUser } from '@/context/UserInfo'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import axios from 'axios'
import CourseComment from '@/components/course/CourseComment'

import CourseInfoBtn from '@/components/course/CourseInfoBtn'

import { useCourses } from '@/context/course'
import { useShow } from '../../context/showProductDetail'
import { AddCartBtn, BuyBtn } from './BuyBtn'
import TopHitsMobile from './TopHitsMobile'



export default function MainContent({pid}) {
  
  const { CoursesData, setCoursesData } = useCourses()
  const [activeContent, setActiveContent] = useState('introduction')
  const [images, setImages] = useState([])
  
  const { show, setShow } = useShow()
  const {isLoggedIn, setIsLoggedIn}=useUser()

  const INITIAL_DETAIL_DATA = {
    id: '',
    course_name: '',
    course_price: '',
    course_description: 0,
    course_image: 0,
    course_subpics: 0,
    course_syllabus: 0,
    teacher_name: '',
    teacher_qualification: 0,
    teacher_specialty: 0,
  }
  const [detailData, setDetailData]=useState(INITIAL_DETAIL_DATA)

  

  

  useEffect(() => {
    if (pid) {
      const getDetail = async () => {
        try {
          if (pid) {
            const response = await axios.get(
              `http://localhost:3005/api/course/${pid}`
            )
            const details = response.data
            console.log(details)
            setDetailData({...details})
            if (details.course_subpics) {
              setImages(JSON.parse(details.course_subpics))
            }
          }
        } catch (error) {
          console.error('Error fetching course details:', error)
        }
      }
      // setCoursesData(INITIAL_DATA)
      getDetail()
      setShow({ ...show, in: true })
    }
  }, [pid])

  

  const handleButtonClick = (contentName) => {
    setActiveContent(contentName)
  }

  return (
    <>
      <div className="mt-5 ms-sm-5 container ed-content-size">
        <div className="d-sm-flex">
          <CoursePic pid={pid} course={CoursesData} />
          <CourseText pid={pid} course={CoursesData} />
        </div>

        

        {CoursesData && CoursesData.course_syllabus ? (
          <>
            <section>
              <div className="d-flex justify-content-center my-5 btn-course-group">
                <div className="row">
                  {/* 網頁版（非手機板）*/}
                  <hr/>
                  <img
                src="http://localhost:3000/product_detail/banner.png"
                alt="product-detail-banner"
              />
                  <div className="col-sm-12 text-start  ">
                    <div className="btn-group mt-3">
                      <button
                        onClick={() => {
                          handleButtonClick('introduction')
                        }}
                        className={`btn hw-bold-text rounded-0 ${
                          activeContent === 'introduction'
                            ? 'btn-secondary active'
                            : 'btn-outline-secondary'
                        }`}
                      >
                        課程介紹
                      </button>
                      <button
                        onClick={() => {
                          handleButtonClick('teacher-info')
                        }}
                        className={`hw-bold-text btn rounded-0 ${
                          activeContent === 'teacher-info'
                            ? 'btn-secondary active'
                            : 'btn-outline-secondary'
                        }`}
                      >
                        教師簡介
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {activeContent === 'introduction' && (
                <div className="col-10 mx-auto">
                  <h6>【課程大綱】</h6>
                  <div className={`lh-base ${style['course-intro']}`}>
                    {CoursesData.course_syllabus
                      .split('\n')
                      .map((line, index) => (
                        <p key={index}>
                          {line}
                          <br />
                        </p>
                      ))}
                  </div>
                </div>
              )}
              {activeContent === 'teacher-info' && (
                <>
                  <div className="col-10 mt-5  mx-auto">
                    <h6>【教師簡介】</h6>
                    <Image
                      alt="header"
                      src="/course-image/selfie.png"
                      width={50}
                      height={50}
                      className="ms-4 rounded-circle"
                    />
                    <p className="fw-bold my-3">
                      教師姓名：{CoursesData.teacher_name}
                    </p>
                    <p className="fw-bold my-3">
                      教師資歷：{CoursesData.teacher_qualification}
                    </p>
                    <p className="fw-bold my-3">教師自介：</p>
                    <p>{CoursesData.teacher_specialty}</p>
                  </div>
                </>
              )}
            </section>

            <section className="course-sp col-10 mt-4  mx-auto">
              <h6>【課程特色】</h6>
              <div className="lh-base">{CoursesData.course_description}</div>
            </section>
            <hr/>
          </>
        ) : (
          <div className="mt-5 mx-auto fs-3">課程籌備中,請敬請期待</div>
        )}
        

        <Review pid={pid}/>

{isLoggedIn?<CourseComment pid={pid}/>:<div className="mx-auto text-center">
                  <h5 className="my-3">請先登入再進行評論</h5>
                  <div className="my-4">
                    <Link href="http://localhost:3000/member/login">
                      <button className="ed-addCart">登入會員</button>
                    </Link>
                  </div>
                </div>}
        
          <div className='d-none d-sm-block'>
          <TopHits />
          </div>
          {/* 手機版 */}
       <div className='d-sm-none'>
        <TopHitsMobile/>
       </div>
      </div>
    </>
  )
}
