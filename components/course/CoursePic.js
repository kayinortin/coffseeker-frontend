import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import CoursePerFetcher from './CoursePerFetcher'
import { BreadCrumbs, BreadCrumbsMobile } from './BreadCrumbs'
import CourseFetcher from './course-fetch'
import { use } from 'echarts'
import { useCourses } from '@/context/course'
import axios from 'axios'

export default function CoursePic({ pid }) {
  const router = useRouter()
  console.log(pid)

  //設定圖片
  const [images, setImages] = useState([])
  const [mainImageIndex, setMainImageIndex] = useState(0)
  const { CoursesData, setCoursesData } = useCourses()

  // console.log(Object.keys(CoursesData).length)
  const [detailData, setDetailData] = useState({
    id: '',
    course_name: '',
    course_price: '',
    course_description: 0,
    course_image: 0,
    course_subpics: 0,
    course_syllabus: 0,
    teacher_name: '',
    teacher_qualification: 0,
    teacher_specialty: 0,
  })
  const {
    id,
    course_name,
    course_price,
    course_description,
    course_image,
    course_subpics,
    course_syllabus,
    teacher_name,
    teacher_qualification,
    teacher_specialty,
  } = detailData

  const getDetail = async () => {
    if (pid) {
      let response = await axios.get(`http://localhost:3005/api/course/${pid}`)
      const details = response.data

      setDetailData({ ...details })
      if (response.data.course_subpic) {
        setImages(JSON.parse(response.data.course_subpic))
      }
    }
  }

  console.log(detailData)

  return (
    <>
      {/* <CoursePerFetcher pid={pid} /> */}

      <div className="col d-flex flex-column col-sm-4">
        <div className="mx-auto">
          <div className="d-sm-none">
            <BreadCrumbsMobile />
          </div>

          <img
            src={`/course-image/${course_image}`}
            // alt={name}
            width={250}
            height={250}
            className="m-2 me-1"
          />
        </div>

        <div className="d-flex mx-auto">
          {images.map((pic, index) => (
            <Image
              key={index}
              src={`/course-image/${course_subpics[index]}`}
              alt={name}
              width={70}
              height={70}
              className="m-2 me-1"
            />
          ))}
        </div>
      </div>
    </>
  )
}
