import React from 'react'
import banner from "@/public/banner-father'sDay.png"
import Image from 'next/image'
import Link from 'next/link'
import SideBar from '@/components/course/SideBar'
import CourseList from '@/components/course/CourseList'
// import { divIcon } from 'leaflet'

export default function Index() {
  return (
    <>
      <div className="">
        <Image src={banner} alt="banner" className="img-fluid" />
        <div className="container-lg mt-5">
          <section className="d-flex">
            <SideBar />
            <CourseList className="d-flex" />
          </section>
        </div>
      </div>
    </>
  )
}
