import React from 'react'

const BreadCrumbs = () => {
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

const BreadCrumbsMobile = () => {
  return (
    <span aria-label="breadcrumb ms-5 d-sm-none">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="#">首頁</a>
        </li>
        <li className="breadcrumb-item">
          <a href="#">課程列表</a>
        </li>
      </ol>
    </span>
  )
}

export { BreadCrumbs, BreadCrumbsMobile }
