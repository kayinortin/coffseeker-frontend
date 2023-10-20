import { useState } from 'react'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import Swal from 'sweetalert2'

function Counter(props) {
  const { number, setNumber, maxCount } = props
  const [isFocused, setIsFocused] = useState(false)

  const handleMinusClick = () => {
    number <= 1 ? setNumber(1) : setNumber(number - 1)
  }

  const handlePlusClick = () => {
    if (number >= maxCount) {
      Swal.fire({
        icon: 'warning',
        title: '已達到庫存量',
        text: '您選擇的數量已超過庫存量',
        iconColor: '#1C262C',
        timer: 2000,
      })
    } else {
      setNumber(number + 1)
    }
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
        className="ed-btn-group d-flex"
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
