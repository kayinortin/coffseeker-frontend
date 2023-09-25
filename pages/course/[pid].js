import SideBar from '@/components/course/SideBar'
import React from 'react'
import Image from 'next/image'
import data from '@/data/course/course[pid].json'
import BreadCrumbs from '@/components/course/BreadCrumbs'
import { useRouter } from 'next/router'

export default function CourseDetails() {
  const router = useRouter()
  const { pid } = router.query

  const courseData = data.course[pid] || {
    image: '',
    name: 'Default Course Name',
  }
  const { image, name } = courseData

  return (
    <div className="container-lg d-flex">
      <SideBar />
      <div>
        <BreadCrumbs />
        <Image
          src={`/course-image/${image}`}
          alt={name}
          width={250}
          height={250}
          className="m-2"
        />
      </div>
    </div>
  )
}
