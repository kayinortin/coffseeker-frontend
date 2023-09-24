import React, { useState } from 'react'
import style from '@/styles/_course.module.scss'

export function AccordionOption({ title, content }) {
  const [isOpen, setIsOpen] = useState(false)

  //   const options = ['拉花課程', '手沖課程', '烘豆課程']

  const level = ['入門', '進階', '高階', '證照']

  const toggleAccordion = () => {
    setIsOpen(!isOpen)
  }
  return (
    <>
      <div className={`accordion ${isOpen ? 'open' : ''}`}>
        <div
          className="accordion-header"
          role="button"
          tabIndex={0}
          onKeyDown={toggleAccordion}
          onClick={toggleAccordion}
        >
          <h5>{title}</h5>
        </div>
        {isOpen && (
          <div className="accordion-content">
            <p>
              {level.map((v, i) => {
                return <p key={i}>{v}</p>
              })}
            </p>
          </div>
        )}
      </div>
    </>
  )
}
