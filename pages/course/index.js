import React from 'react'


import Image from 'next/image'
import Link from 'next/link'
import SideBar from '@/components/course/SideBar'
import CourseList from '@/components/course/CourseList'
import Pagination from '@/components/course/Pagination'

export default function Index() {
  return (
    <>
      <div className="">
        <div className="container-lg mt-5">
          <section>
            <div className="d-flex">
              <SideBar />
              <CourseList className="d-flex mx-4" />
            </div>

            <Pagination />
          </section>
        </div>
      </div>
    </>
  )
}
