import { useState } from 'react'

function Counter(props) {
  const { number, setNumber, show } = props
  const [isFocused, setIsFocused] = useState(false)

  const handleMinusClick = () => {
    number <= 1 ? setNumber(1) : setNumber(number - 1)
  }

  const handlePlusClick = () => {
    setNumber(number + 1)
  }

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  return (
    <>
      <div
        className={show ? 'ed-counter w-50 mobile-counter' : 'ed-counter'}
        role="button"
        tabIndex="0"
        onClick={handleFocus}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            handleFocus()
          }
        }}
        onBlur={handleBlur}
      >
        <button
          type="button"
          className="ed-counter__btn"
          onClick={handleMinusClick}
        >
          <i className="fas fa-minus e-icon ed-counter__icon"></i>
        </button>
        <span
          className={
            isFocused ? 'ed-counter__number focused' : 'ed-counter__number'
          }
        >
          {number}
        </span>
        <button
          type="button"
          className="ed-counter__btn"
          onClick={handlePlusClick}
        >
          <i className="fas fa-plus e-icon ed-counter__icon"></i>
        </button>
      </div>
    </>
  )
}

export default Counter
