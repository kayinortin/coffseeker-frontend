import React, { useState } from 'react'
import CoursePic from '@/components/course/CoursePic'
import CourseText from '@/components/course/CourseText'
import CourseInfoBtn from '@/components/course/CourseInfoBtn'
import style from '@/styles/_course.module.scss'
import Image from 'next/image'
import { useRouter } from 'next/router'
import CoursePerFetcher from './[pid]'

export default function CourseDescription() {
  const router = useRouter()
  const { pid } = router.query
  const [data, setData] = useState(null)

  const onDataFetched = (fetchedData) => {
    setData(fetchedData)
  }

  return (
    <>
      {data && data.course_image.length > 0 ? (
        <>
          <section>
            <div className="d-none d-sm-block">
              <CourseInfoBtn />
            </div>

            <div className="border border-3 col-sm-2 col-4 mb-3 text-center">
              課程介紹
            </div>
            <h6>【課程大綱】</h6>
            <div className={style['course-intro']}>{data.course_syllabus}</div>
          </section>
          <section className="col-10 mt-5 col-sm-12 mx-auto">
            <h6>【教師簡介】</h6>
            <Image
              alt="header"
              src="/course-image/selfie.png"
              width={50}
              height={50}
              className="ms-4 rounded-circle"
            />
            <p className="fw-bold">教師姓名：{data.teacher_name}</p>
            <p className="fw-bold">教師資歷：{data.teacher_qualification}</p>
            <p className="fw-bold">教師自介：</p>
            <p>{data.teacher_specialty}</p>
          </section>
          <section className="course-sp col-10 col-sm-12 mx-auto">
            <h6>【課程特色】</h6>
            <ul>
              {data.course_syllabus.split('\n').map((item, index) => (
                <li key={index}>{item.trim()}</li>
              ))}
            </ul>

            {/* {data.course_description} */}
          </section>
        </>
      ) : (
        <div className="mt-5 mx-auto fs-3">課程籌備中,請敬請期待</div>
      )}

      <CoursePerFetcher pid={pid} onCoursePerFetched={onDataFetched} />
    </>
  )
}
