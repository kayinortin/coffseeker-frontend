import React from 'react'
import data from '@/data/course/course.json'
import Card from './Card'

export default function CourseList() {
  // console.log(data)
  return (
    <div className="">
      <h3 className="text-center">課程列表</h3>
      <span>BreadCrumbs here</span>
      <ul className="d-flex row row-cols-3 flex-wrap list-unstyled">
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
          {
            /* console.log(v) */
          }
          return (
            <>
              <li className="col course-li">
                <Card
                  key={i}
                  name={name}
                  price={price}
                  start_date={start_date}
                  end_date={end_date}
                  capacity={capacity}
                  description={description}
                  image={image}
                />
              </li>
            </>
          )
        })}
      </ul>
    </div>
  )
}
