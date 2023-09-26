import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import data from '@/data/course/course[pid].json'

export default function CoursePic() {
  const router = useRouter()
  const { pid } = router.query

  const courseData = data.course[pid] || {
    image: '',
    name: 'Default Course Name',
  }

  console.log(courseData)
  const { image, name, price } = courseData
  return (
    <div>
      <Image
        src={`/course-image/${image}`}
        alt={name}
        width={250}
        height={250}
        className="m-2 me-1"
      />
      <div className="d-flex justify-content-between">
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
