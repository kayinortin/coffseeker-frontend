import React from 'react'
import CoursePic from '@/components/course/CoursePic'
import CourseText from '@/components/course/CourseText'
import Review from './Reviews'
import CourseDescription from './CourseDescription'

export default function MainContent() {
  return (
    <>
      <div className=" mt-5 ms-5">
        <div className="d-flex">
          <CoursePic />
          <CourseText />
        </div>

        <CourseDescription />
        <Review />
      </div>
    </>
  )
}
