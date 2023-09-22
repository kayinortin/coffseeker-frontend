import React from 'react'
import Accordion from './Accordion'

export default function SideBar() {
  return (
    <div className="col-3 text-center">
      <h3>課程分類</h3>
      {/* <ul className="list-unstyled">
        {options.map((v, i) => {
          return (
            <li key={i} className="course course-li">
              <a href="">{v}</a>
            </li>
          )
        })}
      </ul> */}
      <Accordion />
    </div>
  )
}
