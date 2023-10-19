import { useState, useEffect } from 'react'
import Head from 'next/head'
import Card from './Card'
import Pagination from './Pagination'
import { BreadCrumbs } from './BreadCrumbs'
import CourseFetcher from './course-fetch'
import NewSideBar from './NewSideBar'

import { useCourses } from '@/context/course'
import FetchFavCourseId from '../fav/FetchFavCourse'
import { indexOf } from 'lodash'

export default function CourseList() {
  const [currentPage, setCurrentPage] = useState(1)
  const { coursesData, setCoursesData } = useCourses()


  //--------------------------------pagination
  const itemsPerPage = 9
  const totalItems = coursesData ? coursesData : []
  const totalPages = Math.ceil(totalItems.length / itemsPerPage)

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }
  FetchFavCourseId()
  return (
    <>
      <CourseFetcher />
      <div>
        <Head>
          <title>全站商品｜探索咖啡COFFSEEKER</title>
        </Head>
      </div>
      {coursesData ? (
        <div className="container d-flex">
          <NewSideBar onFilter={setCoursesData} />
          <div className="container">
            <div className="mt-4">
              <BreadCrumbs />
            </div>
            <ul className="row list-unstyled">
              {coursesData
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((v, i) => {
                  return (
                    
                      <div key={i} className="col-12 col-sm-4">
                        <li className="d-flex justify-content-center course-li">
                          <Card course={v} />
                        </li>
                      </div>
                    
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
    </>
  )
}
