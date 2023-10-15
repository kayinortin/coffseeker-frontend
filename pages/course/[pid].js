import { React, useState } from 'react'
import data from '@/data/course/course[pid].json'
import { useRouter } from 'next/router'
import CoursePic from '@/components/course/CoursePic'
import CourseText from '@/components/course/CourseText'
import CourseInfoBtn from '@/components/course/CourseInfoBtn'
import style from '@/styles/_course.module.scss'
import MainContent from '@/components/course/MainContent'
import CoursePerFetcher from '@/components/course/CoursePerFetcher'
import NewSideBar from '@/components/course/NewSideBar'

export default function CourseDetails() {
  const router = useRouter()
  const { pid } = router.query
  const [data, setData] = useState(null)
  // console.log(pid)

  // const courseData = data.course[pid] || {
  //   image: '',
  //   name: 'Default Course Name',
  // }

  // const { image, name, price } = courseData

  return (
    <>
      <main className={`${style['course-bg']}`}>
        <div className={`container-lg`}>
          <div className="d-flex">
            <NewSideBar />
            <MainContent pid={pid}/>
          </div>
        </div>
      </main>
    </>
  )
}
