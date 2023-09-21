import React from 'react'
import data from '@/data/course/course.json'
import Card from './Card'

export default function CourseList() {
  console.log(data)
  return (
    <div>
      <ul>
        {data.map((v, i) => {
          return (
            <li key={v.id}>
              <h2>{v.name}</h2>
              <p>價格: {v.price}</p>
              <p>開始日期: {v.start_date}</p>
              <p>結束日期: {v.end_date}</p>
              <p>容量: {v.capacity}</p>
              <p>描述: {v.description}</p>
              <img src={v.image} alt={v.name} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}
