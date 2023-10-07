import React, { useState, useEffect } from 'react'

import CourseInfoBtn from '@/components/course/CourseInfoBtn'
import style from '@/styles/_course.module.scss'
import Image from 'next/image'
import { useRouter } from 'next/router'

import CoursePerFetcher from './CoursePerFetcher'

export default function CourseDescription() {
  const router = useRouter()
  const { pid } = router.query
  const [data, setData] = useState(null)
  const [activeContent, setActiveContent] = useState('introduction')

  //-------------------------設定按鈕狀態後改變下文
  const handleButtonClick = (contentName) => {
    setActiveContent(contentName)
  }

  //-------------------------抓資料
  const onDataFetched = (fetchedData) => {
    setData(fetchedData)
  }

  return (
    <>
      {data && data.course_image.length > 0 ? (
        <>
          <section>
            <div className="">
              <CourseInfoBtn
                activeContent={activeContent}
                onButtonClick={handleButtonClick}
              />
            </div>

            {activeContent === 'introduction' && (
              <div className="col-10 mx-auto">
                <div className="border border-3 col-sm-2 col-4 mb-3 text-center">
                  課程介紹
                </div>
                <h6>【課程大綱】</h6>
                <div className={`lh-base ${style['course-intro']}`}>
                  {data.course_syllabus.split('\n').map((line, index) => (
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
                  <p className="fw-bold my-3">教師姓名：{data.teacher_name}</p>
                  <p className="fw-bold my-3">
                    教師資歷：{data.teacher_qualification}
                  </p>
                  <p className="fw-bold my-3">教師自介：</p>
                  <p>{data.teacher_specialty}</p>
                </div>
              </>
            )}
          </section>

          <section className="course-sp col-10 mt-4  mx-auto">
            <h6>【課程特色】</h6>
            <div className="lh-base">{data.course_description}</div>

            {/* {breakedSyllabus} */}
          </section>
        </>
      ) : (
        <div className="mt-5 mx-auto fs-3">課程籌備中,請敬請期待</div>
      )}

      <CoursePerFetcher pid={pid} onCoursePerFetched={onDataFetched} />
    </>
  )
}
