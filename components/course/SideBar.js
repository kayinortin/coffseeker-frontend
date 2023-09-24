import React from 'react'
import Accordion from './Accordion'

export default function SideBar() {
  const options = ['拉花課程', '手沖課程', '烘豆課程']

  return (
    <div className="col-2 text-center">
      <h3>課程分類</h3>
      {options.map((v, i) => {
        return <Accordion title={v} key={i} />
      })}
    </div>
  )
}
