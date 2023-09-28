import React from 'react'
import CoursePic from '@/components/course/CoursePic'
import CourseText from '@/components/course/CourseText'
import Review from './Reviews'
import CourseDescription from './CourseDescription'
import TopHits from './TopHits'

export default function MainContent() {
  return (
    <>
      <div className=" mt-5 ms-sm-5">
        <div className="d-sm-flex">
          <CoursePic />
          <CourseText />
        </div>

        <CourseDescription />
        <h3 className="text-center">學員評價</h3>
        <Review />
        <Review />
        <Review />
        <Review />
        <h3 className="text-center">熱門課程</h3>
        <TopHits />
      </div>
    </>
  )
}
