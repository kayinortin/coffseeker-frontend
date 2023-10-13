import React from 'react'
import BreadCrumbs from '@/components/course/BreadCrumbs'
import Image from 'next/image'
import Link from 'next/link'
import NewSideBar from '@/components/course/NewSideBar'
import CourseList from '@/components/course/CourseList'
import Pagination from '@/components/course/Pagination'
import style from '@/styles/_course.module.scss'
import { useCourses } from '@/context/course'

export default function Index() {
  const {coursesData, setCoursesData}=useCourses()
  return (
    <>
      <div className="container-lg">
        <section>
          <div className="d-flex">
            {/* <NewSideBar onFilter={setCoursesData}/> */}
            <CourseList />
          </div>
        </section>
      </div>
    </>
  )
}
