import React, { useState } from 'react'
import styles from '@/styles/_course.module.scss'

export default function CourseInfoBtn({ activeContent, onButtonClick }) {
  // const [activeButton, setActiveButton] = useState('introduction')

  return (
    <div className="d-flex justify-content-center my-5 btn-course-group">
      <div className="row">
        {/* 網頁版（非手機板）*/}
        <div className="col-sm-12 text-start  ">
          <div className="btn-group mt-3">
            <button
              onClick={() => {
                onButtonClick('introduction')
              }}
              className={activeContent === 'introduction' ? 'active' : ''}
            >
              課程介紹
            </button>
            <button
              onClick={() => {
                onButtonClick('teacher-info')
              }}
              className={activeContent === 'teacher-info' ? 'active' : ''}
            >
              教師簡介
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
