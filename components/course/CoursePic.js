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
import CourseDetailFavIcon from '@/components/course/CourseDetailFavIcon'

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

  const imgIndex=[1,2,3]

  return (
    <>
      

      <div className="col d-flex flex-column col-sm-4">
        <div className="mx-auto hw-detail-left">
          <div className="d-sm-none">
            <BreadCrumbsMobile />
          </div>
          <div className="ed-image-gallery ">
            {/* <div className="position-relative"> */}
            <img
              src={`/course-image/${course_image}`}
              // alt={name}
              width={300}
              height={300}
              className="m-2 me-1 ed-image-main"
            />
            <CourseDetailFavIcon id={pid} />
            {/* </div> */}

            <div className="ed-image-row">
              {images &&
                images.length > 0 &&
                imgIndex.map((pic, index) => (
                  <img
                    key={index}
                    src={`/${images[index]}`}
                    alt={name}
                    width={100}
                    height={100}
                    className="ed-image-small"
                  />
                ))}
            </div>
          </div>
        </div>

        <div className="d-flex ed-activity align-items-center ">
          <div className="ed-activity-title text-center">新會員優惠</div>
          <div className="ed-activity-detail">
            領取專屬優惠卷 <br /> 折抵商品<span>100元</span>
          </div>
        </div>
      </div>
    </>
  )
}
