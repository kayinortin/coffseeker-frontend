import React from 'react'

export default function SideBar() {
  const options = ['拉花課程', '手沖課程', '烘豆課程']
  return (
    <div className="">
      <h3>課程分類</h3>
      <ul>
        {options.map((v, i) => {
          return (
            <li key={i} className="course">
              <a href="">{v}</a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
