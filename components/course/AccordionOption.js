import React, { useState } from 'react'
import style from '@/styles/_course.module.scss'

// 這是子元件，應該要將資料從父元件傳遞過來
// 其父元件是Accordion.js
// 要將const options = ['拉花課程', '手沖課程', '烘豆課程']
// const level = ['入門', '進階', '高階', '證照']
// 都放在父元件中，再傳遞給子元件

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
