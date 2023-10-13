import React from 'react'
import CourseList from '@/components/course/CourseList'

export default function Index() {
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
