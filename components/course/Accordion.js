import React from 'react'
import style from '@/styles/_course.module.scss'
import 'bootstrap/scss/bootstrap.scss'
import { AccordionOption } from './AccordionOption'

function Accordion({ title, content }) {
  const options = ['拉花課程', '手沖課程', '烘豆課程']
  const level = ['入門', '進階', '高階', '證照']

  return (
    <div className="accordion" id="accordionExample">
      {options.map((v, i) => {
        const targetId = `collapse${i}`
        return (
          <div className="accordion-item" key={i}>
            <h2 className="accordion-header">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#${targetId}`}
                aria-expanded="false"
                aria-controls={targetId}
              >
                {v}
              </button>
            </h2>
            <div
              id={targetId}
              className={`accordion-collapse collapse ${i === 0 ? 'show' : ''}`}
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <AccordionOption options={options} level={level} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Accordion
