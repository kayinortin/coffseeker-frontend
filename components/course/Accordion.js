import React, { useState } from 'react'
import style from '@/styles/_course.module.scss'
import 'bootstrap/scss/bootstrap.scss'
import { AccordionOption } from './AccordionOption'

// 按鈕會連動的原因是因為data-bs-target="#collapseOne"，這個id是固定的，所以會連動
// 用到map 與 index 處理
// 讓每個按鈕都有自己的id，所以要用到index
// 這個檔案是AccordionOption.js的父元件

function Accordion({ title, content }) {
  return (
    // <>
    //   <AccordionOption title={title} />
    // </>
    <div className="accordion" id="accordionExample">
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            {title}
          </button>
        </h2>
        <div
          id="collapseOne"
          className="accordion-collapse collapse show"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            <AccordionOption content={content} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Accordion
