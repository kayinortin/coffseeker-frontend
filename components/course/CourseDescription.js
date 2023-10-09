import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import axios from 'axios'
import style from '@/styles/_course.module.scss'

import CourseInfoBtn from '@/components/course/CourseInfoBtn'

import { useCourses } from '@/context/course'

export default function CourseDescription() {
  const router = useRouter()
  const { pid } = router.query
  const { CoursesData, setCoursesData } = useCourses()
  const [activeContent, setActiveContent] = useState('introduction')

  //-------------------------設定按鈕狀態後改變下文
  const handleButtonClick = (contentName) => {
    setActiveContent(contentName)
  }

  const getDetail = async () => {
    if (pid) {
      let response = await axios.get(`http://localhost:3005/api/course/${pid}`)

      const details = response.data

      setCoursesData(details)
      console.log(details)
    }
  }

  useEffect(() => {
    if (pid) {
      setCoursesData({
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
      })
      getDetail()
    }
  }, [pid])

  console.log(CoursesData)

  return (
    <>
      {CoursesData && CoursesData.length > 0 ? (
        <>
          <section>
            <div className="">
              <CourseInfoBtn
              // activeContent={activeContent}
              // onButtonClick={handleButtonClick}
              />
            </div>

            {activeContent === 'introduction' && (
              <div className="col-10 mx-auto">
                <div className="border border-3 col-sm-2 col-4 mb-3 text-center">
                  課程介紹
                </div>
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

            {/* {breakedSyllabus} */}
          </section>
        </>
      ) : (
        <div className="mt-5 mx-auto fs-3">課程籌備中,請敬請期待</div>
      )}
    </>
  )
}
