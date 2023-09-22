import React, { useState } from 'react'

function Accordion({ title, content }) {
  const [isOpen, setIsOpen] = useState(false)

  const options = ['拉花課程', '手沖課程', '烘豆課程']

  const level = ['入門', '進階', '高階', '證照']

  const toggleAccordion = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="test accordion" id="accordionExample">
      <div className="accordion-item border-0">
        <h2 className="accordion-header">
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            拉花課程
          </button>
        </h2>
        <div
          id="collapseOne"
          className="accordion-collapse collapse show"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            {level.map((v, i) => {
              return <p key={i}>{v}</p>
            })}
          </div>
        </div>
      </div>
      <div className="accordion-item border-0">
        <h2 className="accordion-header">
          <button
            className="accordion-button  collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTwo"
            aria-expanded="false"
            aria-controls="collapseTwo"
          >
            手沖課程
          </button>
        </h2>
        <div
          id="collapseTwo"
          className="accordion-collapse collapse"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            {level.map((v, i) => {
              return <p key={i}>{v}</p>
            })}
          </div>
        </div>
      </div>
      <div className="accordion-item border-0">
        <h2 className="accordion-header">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseThree"
            aria-expanded="false"
            aria-controls="collapseThree"
          >
            烘豆課程
          </button>
        </h2>
        <div
          id="collapseThree"
          className="accordion-collapse collapse"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            {level.map((v, i) => {
              return <p key={i}>{v}</p>
            })}
          </div>
        </div>
      </div>
    </div>
    // <div className="accordion">
    //   <div
    //     className="accordion-header"
    //     tabIndex={0}
    //     role="button"
    //     onKeyDown={toggleAccordion}
    //     onClick={toggleAccordion}
    //   >
    //     {options.map((v, i) => {
    //       return (
    //         <div key={i}>
    //           {v}
    //           {isOpen && (
    //             <div className="accordion-content">
    //               {level.map((v, i) => {
    //                 return <p key={i}>{v}</p>
    //               })}
    //             </div>
    //           )}
    //         </div>
    //       )
    //     })}

    //     <span>{isOpen ? '-' : '+'}</span>
    //   </div>
    //   {isOpen && (
    //     <div className="accordion-content">
    //       {level.map((v, i) => {
    //         return <p key={i}>{v}</p>
    //       })}
    //     </div>
    //   )}
    // </div>
  )
}

export default Accordion
