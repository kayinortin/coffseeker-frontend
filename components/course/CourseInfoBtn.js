import React, { useState } from 'react'

export default function CourseInfoBtn() {
  const [activeContent, setActiveContent] = useState('introduction')

  const handleButtonClick = (contentName) => {
    setActiveContent(contentName)
  }

  return (
    <div className="d-flex justify-content-center my-5 btn-course-group">
      <div className="row">
        {/* 網頁版（非手機板）*/}
        <div className="col-sm-12 text-start  ">
          <div className="btn-group mt-3">
            <button
              onClick={() => {
                setActiveContent('introduction')
              }}
              className={`btn hw-bold-text rounded-0 ${
                activeContent === 'introduction'
                  ? 'btn-secondary active'
                  : 'btn-outline-secondary'
              }`}
            >
              課程介紹
            </button>
            <button
              onClick={() => {
                setActiveContent('teacher-info')
              }}
              className={`hw-bold-text btn rounded-0 ${
                activeContent === 'teacher-info'
                  ? 'btn-secondary active'
                  : 'btn-outline-secondary'
              }`}
            >
              教師簡介
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
