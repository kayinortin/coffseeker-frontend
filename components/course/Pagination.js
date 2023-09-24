import React from 'react'
import style from '@/styles/_course.module.scss'

export default function Pagination() {
  const pages = ['1', '2', '3', '4', '5']
  return (
    <div className="d-flex">
      <i className="fa-solid fa-arrow-left"></i>
      {pages.map((v, i) => {
        return (
          <li key={i} className={style['course-li']}>
            {v}
          </li>
        )
      })}
      <i className="fa-solid fa-arrow-right"></i>
    </div>
  )
}
