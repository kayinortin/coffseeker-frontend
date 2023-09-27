import React from 'react'
import BreadCrumbs from '@/components/course/BreadCrumbs'
import Image from 'next/image'
import Link from 'next/link'
import SideBar from '@/components/course/SideBar'
import CourseList from '@/components/course/CourseList'
import Pagination from '@/components/course/Pagination'
import style from '@/styles/_course.module.scss'

export default function Index() {
  return (
    <>
      <main className={`${style['course-bg']}`}>
        <div className="">
          <div className="container-lg  course-list">
            <section>
              {/* <BreadCrumbs className="ms-5" /> */}
              <div className="d-flex">
                <SideBar className="" />
                <CourseList />
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  )
}
