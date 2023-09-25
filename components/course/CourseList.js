import React from 'react'
import data from '@/data/course/course.json'
import Card from './Card'
import Breadcrumb from './BreadCrumbs'
import Pagination from './Pagination'

export default function CourseList() {
  // console.log(data)
  return (
    <div className="">
      <h3 className="text-center mt-5">課程列表</h3>
      <Breadcrumb className="" />
      <ul className=" row row-cols-sm-3 flex-wrap list-unstyled">
        {data.map((v, i) => {
          let {
            name,
            price,
            start_date,
            end_date,
            capacity,
            description,
            image,
          } = v

          return (
            <li key={i} className=" d-flex justify-content-center course-li">
              <Card
                // key={i}
                name={name}
                price={price}
                start_date={start_date}
                end_date={end_date}
                description={description}
                image={image}
              />
            </li>
          )
        })}
      </ul>
      {/* <Pagination /> */}
    </div>
  )
}
