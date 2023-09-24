import React from 'react'
import Accordion from './Accordion'

export default function SideBar() {
  const options = ['拉花課程', '手沖課程', '烘豆課程']

  return (
    <div className="col-sm-2 d-none d-sm-block text-center my-5 me-5">
      <h3>課程分類</h3>
      {options.map((v, i) => {
        return <Accordion title={v} key={i} />
      })}
    </div>
  )
}
