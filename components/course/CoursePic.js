import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { BreadCrumbs, BreadCrumbsMobile } from './BreadCrumbs'
import { selectedCourse, useCourses } from '@/context/course'
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
  const {selectedCourse}=useCourses()

  

  

  
  


  let ArrPic =[]
  if(selectedCourse.course_subpics){

     ArrPic = JSON.parse(selectedCourse.course_subpics)
     
    }


  

  const imgIndex=[1,2,3]

  return (
    <>
      

      <div className="col d-flex flex-column col-sm-4">
        <div className="mx-auto hw-detail-left">
          <div className="d-sm-none">
            <BreadCrumbsMobile />
          </div>
          <div className="ed-image-gallery ">
            
            <img
              src={`http://localhost:3000/${selectedCourse.course_image}`}
              // alt={name}
              width={300}
              height={300}
              className="m-2 me-1 ed-image-main"
            />
            <CourseDetailFavIcon id={pid} />
            

            <div className="ed-image-row">
              {selectedCourse &&
                
                imgIndex.map((pic, index) => (
                  <img
                    key={index}
                    src={`http://localhost:3000/${ArrPic[pic]}`}
                    alt={selectedCourse.course_name}
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
