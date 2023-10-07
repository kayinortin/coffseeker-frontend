import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import CoursePerFetcher from './CoursePerFetcher'
import { BreadCrumbs, BreadCrumbsMobile } from './BreadCrumbs'
import CourseFetcher from './course-fetch'
import { use } from 'echarts'
import { useCourses } from '@/context/course'
import axios from 'axios'
import { useShow } from '../../context/showProductDetail'

const INITIAL_DATA = {
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
}

export default function CoursePic({ pid }) {
  const router = useRouter()
  const { show, setShow } = useShow()

  const [images, setImages] = useState([])
  const [detailData, setDetailData] = useState(INITIAL_DATA)
  const {
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
    try {
      if (pid) {
        let response = await axios.get(
          `http://localhost:3005/api/course/${pid}`
        )
        const details = response.data
        setDetailData({ ...details })
        if (details.course_subpics) {
          setImages(JSON.parse(details.course_subpics))
        }
      }
    } catch (error) {
      console.error('Error fetching course details:', error)
    }
  }

  useEffect(() => {
    if (pid) {
      setDetailData(INITIAL_DATA)
      getDetail()
      setShow({ ...show, in: true })
    }
  }, [pid])

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
          {images &&
            images.length > 0 &&
            images.map((pic, index) => (
              <img
                key={index}
                src={`/course-image/${images[index]}`}
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
