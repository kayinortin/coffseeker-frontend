import React from 'react'

export default function BreadCrumbs() {
  return (
    <>
      <span aria-label="breadcrumb ms-5">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#">首頁</a>
          </li>
          <li className="breadcrumb-item">
            <a href="#">課程列表</a>
          </li>
        </ol>
      </span>
    </>
  )
}
