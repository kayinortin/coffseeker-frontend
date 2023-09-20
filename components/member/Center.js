import React from 'react'
import SideBar from './SideBar'
export default function Center() {
  return (
    <>
      <div className={'content border border-dark'}>
        <div className={'form-title border-bottom border-dark p-3'}>
          會員中心
        </div>
        <SideBar />
      </div>
    </>
  )
}
