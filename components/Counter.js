import { useState } from 'react'

function Counter(props) {
  const { number, setNumber, show } = props
  return (
    <>
      <div className={show ? 'ed-counter w-50 mobile-counter' : 'ed-counter'}>
        <button
          type="button"
          className="ed-counter__btn"
          onClick={() => {
            number <= 1 ? setNumber(1) : setNumber(number - 1)
          }}
        >
          <i className="fas fa-minus e-icon ed-counter__icon"></i>
        </button>
        {number}
        <button type="button" className="ed-counter__btn">
          <i
            className="fas fa-plus e-icon ed-counter__icon"
            onClick={() => {
              setNumber(number + 1)
            }}
          ></i>
        </button>
      </div>
    </>
  )
}

export default Counter
