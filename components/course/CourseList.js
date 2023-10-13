import React, { useEffect } from 'react'
// import data from '@/data/course/course.json'
import Card from './Card'
import Pagination from './Pagination'
import { BreadCrumbs } from './BreadCrumbs'
import CourseFetcher from './course-fetch'
import { useState } from 'react'
import NewSideBar from './NewSideBar'
import { useCourses } from '@/context/course'
import axios from 'axios'
export default function CourseList({ pid }) {
  const [data, setData] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const {coursesData, setCoursesData}=useCourses()

  const onDataFetched = (fetchedData) => {
    setData(fetchedData)
  }

  //--------------------------------pagination
  const itemsPerPage = 9
  const totalItems = data ? data.courses : []
  const totalPages = Math.ceil(totalItems.length / itemsPerPage)
  useEffect(() => {}, [data, currentPage])

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  

  return (
    <>
      {data && data.courses && data.courses.length > 0 ? (
        <div className='container d-flex'>
          <NewSideBar onFilter={setCoursesData}/>
          <div>
          <div className="mt-4">
            <BreadCrumbs />
          </div>
          <ul className="row list-unstyled">
            {totalItems
              .slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
              .map((v, i) => {
                return (
                  <>
                    <div key={i} className="col-12 col-sm-4">
                      <li
                        
                        className="d-flex justify-content-center course-li"
                      >
                        <Card
                          
                          course={v}
                        />
                      </li>
                    </div>
                  </>
                )
              })}
          </ul>
          <div className="my-5 d-flex justify-content-center">
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
          </div>
          
        </div>
      ) : (
        <div className="mt-5 mx-auto fs-3">課程籌備中,請敬請期待</div>
      )}
      {/*onDataFetched 為第15行定義的 這邊存入onCourseFetched並帶到子元件*/}
      <CourseFetcher onCourseFetched={onDataFetched} />
    </>
  )
}
