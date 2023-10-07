import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import CoursePerFetcher from './[pid]'
import { BreadCrumbs, BreadCrumbsMobile } from './BreadCrumbs'
import CourseFetcher from './course-fetch'
import { use } from 'echarts'

export default function CoursePic() {
  const router = useRouter()
  const { isReady } = router
  const { pid } = router.query
  const [data, setData] = useState(null)
  useEffect(() => {}, [])

  const onDataFetched = (fetchedData) => {
    setData(fetchedData)
  }

  const newSubPics = JSON.parse(data.course_subpics)

  // console.log(typeof data.course_subpics)

  return (
    <>
      {data && data.course_image.length > 0 ? (
        <div className="col d-flex flex-column col-sm-4">
          <div className="mx-auto">
            <div className="d-sm-none">
              <BreadCrumbsMobile />
            </div>

            <img
              src={`/course-image/${data.course_image}`}
              alt={name}
              width={250}
              height={250}
              className="m-2 me-1"
            />
          </div>

          <div className="d-flex mx-auto">
            <Image
              src={`/course-image/${data.course_subpics.pic1}`}
              alt={name}
              width={70}
              height={70}
              className="m-2 me-1"
            />
            <Image
              src={`/course-image/brewing_1.jpg`}
              alt={name}
              width={70}
              height={70}
              className="m-2 me-1"
            />
            <Image
              src={`/course-image/brewing_1.jpg`}
              alt={name}
              width={70}
              height={70}
              className="m-2 me-1"
            />
          </div>
        </div>
      ) : (
        <div className="mt-5 mx-auto fs-3">課程籌備中,請敬請期待</div>
      )}

      <CoursePerFetcher pid={pid} onCoursePerFetched={onDataFetched} />
    </>
  )
}
