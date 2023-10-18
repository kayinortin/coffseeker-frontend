import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { BreadCrumbs, BreadCrumbsMobile } from './BreadCrumbs'
import {  useCourses } from '@/context/course'
import axios from 'axios'
import { useShow } from '../../context/showProductDetail'
import CourseDetailFavIcon from '@/components/course/CourseDetailFavIcon'

export default function CoursePic({ pid }) {
  const router = useRouter()
  const { show, setShow } = useShow()
  const { selectedCourse } = useCourses()
  const [images, setImages] = useState([])
  const [mainImageIndex, setMainImageIndex] = useState(0)

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

  const [detailData, setDetailData]=useState(INITIAL_DATA)
  const {
    id,
    course_name,
    course_image,
    course_subpics
  }=detailData
  

  useEffect(()=>{
    const getDetail=async()=>{
      if(pid){
        let response=await axios.get(
          `http://localhost:3005/api/course/${pid}`
        )
        const details=response.data

        setDetailData({...details})
        if(response.data.course_subpics){
          setImages(JSON.parse(response.data.course_subpics))
        }
      }
    }
    if(pid){
      getDetail()
    }
  },[pid])

  

  return (
    <>
      <div className="col d-flex flex-column col-sm-4">
        <div className="mx-auto hw-detail-left">
          <div className="d-sm-none">
            <BreadCrumbsMobile />
          </div>
          <div className="ed-image-gallery ">
            <Image
              src={`/${images[mainImageIndex]}`}
              // alt={name}
              width={300}
              height={300}
              className="m-2 me-1 ed-image-main"
            />
            <CourseDetailFavIcon id={pid} />
            <div className="ed-image-row">
              {
                images.map((pic, index) => {
                  if (index === mainImageIndex) return null
                  return (
                    <Image
                      key={index}
                      src={`/${pic}`}
                      alt={selectedCourse.course_name}
                      width={100}
                      height={100}
                      className="ed-image-small"
                      onClick={()=>{setMainImageIndex(index)}}
                    />
                  )
                })}
            </div>
          </div>
        </div>

        <div className="d-flex ed-activity align-items-center ps-2">
          <div className="ed-activity-title text-center">新會員優惠</div>
          <div className="ed-activity-detail">
            領取專屬優惠卷 <br /> 折抵課程<span>100元</span>
          </div>
        </div>
      </div>
    </>
  )
}
