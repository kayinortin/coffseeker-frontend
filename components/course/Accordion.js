import React, { useState } from 'react'
import style from '@/styles/_course.module.scss'
import 'bootstrap/scss/bootstrap.scss'
import { AccordionOption } from './AccordionOption'

// 按鈕會連動的原因是因為data-bs-target="#collapseOne"，這個id是固定的，所以會連動
// 用到map 與 index 處理
// 讓每個按鈕都有自己的id，所以要用到index
// 這個檔案是AccordionOption.js的父元件

function Accordion({ title, content }) {
  const [isOpen, setIsOpen] = useState(false)
  const bsTarget = ['1', '2', '3']
  const level = ['入門', '進階', '高階', '證照']
  return (
    // <>
    //   <AccordionOption title={title} />
    // </>
    <div className={`accordion ${isOpen ? 'open' : ''}`} id="accordionExample">
      <div className="accordion-item">
        <h2 className="accordion-header">
          {bsTarget.map((v, i) => {
            return (
              <button
                key={i}
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                // data-bs-target="#collapseOne"
                data-bs-target={`#collapse${v}`}
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                {title}
              </button>
            )
          })}
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
