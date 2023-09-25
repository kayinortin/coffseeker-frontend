import React, { useState } from 'react'
import style from '@/styles/_course.module.scss'
import 'bootstrap/scss/bootstrap.scss'
import { AccordionOption } from './AccordionOption'

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
