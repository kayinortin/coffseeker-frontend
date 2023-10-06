import React, { useState } from 'react'

function Accordion() {
  const [activeAccordion, setActiveAccordion] = useState('')

  const toggleAccordion = (accordionName) => {
    if (activeAccordion === accordionName) {
      setActiveAccordion('')
    } else {
      setActiveAccordion(accordionName)
    }
  }

  return (
    <div className="col-sm-2 d-none d-sm-block text-center my-5 me-5">
      <h3>課程分類</h3>
      <AccordionItem
        title="拉花課程"
        isOpen={activeAccordion === '拉花課程'}
        onClick={() => toggleAccordion('拉花課程')}
      >
        <AccordionItem title="入門" />
        <AccordionItem title="進階" />
        <AccordionItem title="高階" />
        <AccordionItem title="證照" />
      </AccordionItem>

      <AccordionItem
        title="手沖課程"
        isOpen={activeAccordion === '手沖課程'}
        onClick={() => toggleAccordion('手沖課程')}
      >
        <AccordionItem title="入門" />
        <AccordionItem title="進階" />
        <AccordionItem title="高階" />
        <AccordionItem title="證照" />
      </AccordionItem>

      <AccordionItem
        title="烘豆課程"
        isOpen={activeAccordion === '烘豆課程'}
        onClick={() => toggleAccordion('烘豆課程')}
      >
        <AccordionItem title="入門" />
        <AccordionItem title="進階" />
        <AccordionItem title="高階" />
        <AccordionItem title="證照" />
      </AccordionItem>
    </div>
  )
}

function AccordionItem({ title, isOpen, onClick, children }) {
  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onClick()
          }
        }}
        className={`accordion-title ${isOpen ? 'active' : ''}`}
      >
        {title}
      </div>
      {isOpen && <div className="accordion-content">{children}</div>}
    </div>
  )
}

export default Accordion
