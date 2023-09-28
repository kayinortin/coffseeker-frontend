import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import data from '@/data/course/course[pid].json'
import { BreadCrumbs, BreadCrumbsMobile } from './BreadCrumbs'

export default function CoursePic() {
  const router = useRouter()
  const { pid } = router.query

  const courseData = data.course[pid] || {
    image: '',
    name: 'Default Course Name',
  }

  // console.log(courseData)
  const { image, name, price } = courseData
  return (
    <div className="col d-flex flex-column col-sm-4">
      <div className="mx-auto">
        <div className="d-sm-none">
          <BreadCrumbsMobile />
        </div>

        <Image
          src={`/course-image/${image}`}
          alt={name}
          width={250}
          height={250}
          className="m-2 me-1"
        />
      </div>

      <div className="d-flex mx-auto">
        <Image
          src={`/course-image/${image}`}
          alt={name}
          width={70}
          height={70}
          className="m-2 me-1"
        />
        <Image
          src={`/course-image/${image}`}
          alt={name}
          width={70}
          height={70}
          className="m-2 me-1"
        />
        <Image
          src={`/course-image/${image}`}
          alt={name}
          width={70}
          height={70}
          className="m-2 me-1"
        />
      </div>
    </div>
  )
}
