import React from 'react'
import data from '@/data/course/course.json'

export default function CourseList() {
  return (
    <div>
      <ul>
        {data.map((v, i) => {
          return <li key={i}>{v.id}</li>
        })}
      </ul>
    </div>
  )
}
