import React from 'react'
import Accordion from './Accordion'

// 這個應該是所有的父元件
// 導入相對應的子元件做組裝
// import Accordion from './Accordion'
// import AccordionOption from './AccordionOption'
// 再傳遞props，讓子元件可以使用
// 在父元件中，要把所有要傳遞的資料整理好，再傳遞給子元件

export default function SideBar() {
  return (
    <div className="col-sm-2 d-none d-sm-block text-center my-5 me-5">
      <h3>課程分類</h3>
      {/* {options.map((v, i) => {
        return <Accordion title={v} key={i} />
      })} */}
      <Accordion />
    </div>
  )
}
