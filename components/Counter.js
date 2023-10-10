import { useState } from 'react'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'

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
        className="btn-group"
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
          className="quantityMinus"
          onClick={handleMinusClick}
        >
          <AiOutlineMinus />
        </button>
        <span className="form-control forminput text-center">{number}</span>
        <button type="button" className="quantityAdd" onClick={handlePlusClick}>
          <AiOutlinePlus />
        </button>
      </div>
    </>
  )
}

export default Counter
