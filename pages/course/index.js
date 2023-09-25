import React from 'react'
<<<<<<< HEAD
import banner from "@/public/index-image/banner-father'sDay.png"
=======
import BreadCrumbs from '@/components/course/BreadCrumbs'
>>>>>>> upstream/dev
import Image from 'next/image'
import Link from 'next/link'
import SideBar from '@/components/course/SideBar'
import CourseList from '@/components/course/CourseList'
import Pagination from '@/components/course/Pagination'

export default function Index() {
  return (
    <>
      <div className="">
        <div className="container-lg  course-list">
          <section>
            {/* <BreadCrumbs className="ms-5" /> */}
            <div className="d-flex">
              <SideBar className="" />
              <CourseList className="d-flex mx-4" />
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
