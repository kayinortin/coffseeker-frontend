import React, { useState } from 'react'
import Link from 'next/link'
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from 'react-icons/md'
import ReactSlider from 'react-slider'
import axios from 'axios'

function Accordion(props) {
  const [isArtExpanded, setIsArtExpanded] = useState(true)
  const [isPourExpanded, setIsPourExpanded] = useState(true)
  const [isRoastExpanded, setIsRoastExpanded] = useState(true)
  const [filterForm, setFilterForm] = useState({
    latte_art: [],
    pour: [],
    roast: [],
  })
  const levels = ['入門', '進階', '高階', '證照']

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    let queryString = 'http://localhost:3005/api/course/qs?'
    if (filterForm.latte_art.length) {
      queryString += `latte_art=${filterForm.latte_art.join(',')}&`
      console.log(queryString)
    }
    if (filterForm.roast) {
      queryString += `roast=${filterForm.roast.join(',')}&`
      console.log(queryString)
    }
    if (filterForm.pour) {
      queryString += `pour=${filterForm.pour.join(',')}&`
      console.log(queryString)
    }
    try {
      const response = await axios.get(queryString)
      props.onFilter(response.data.data)
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }

  const handleFieldChange = (e) => {
    const { name, value, checked } = e.target

    if (name === 'latte_art' || name === 'pour' || name === 'roast') {
      setFilterForm((prevState) => ({
        ...prevState,
        [name]: checked
          ? [...prevState[name], value]
          : prevState[name].filter((item) => item !== value),
      }))
    } else {
      setFilterForm((prevState) => ({ ...prevState, [name]: value }))
    }
  }

  const resetFilter = () => {
    setFilterForm({ latte_art: [], pour: [], roast: [] })
  }

  return (
    <div className="col-sm-2 d-none d-sm-block text-center my-5 me-5">
      {/* <h6 className='ed-filter-title'>課程列表</h6> */}
      <form onSubmit={handleFormSubmit}>
        <fieldset>
          <legend
            className="mt-2 mb-3 ed-filter-title"
            onClick={() => {
              setIsArtExpanded(!isArtExpanded)
            }}
          >
            拉花課程
            <span className="arrow-icon">
              {isArtExpanded ? (
                <MdOutlineKeyboardArrowDown />
              ) : (
                <MdOutlineKeyboardArrowUp />
              )}
            </span>
          </legend>
          {/* 拉花 */}
          {isArtExpanded &&
            levels.map((art, index) => (
              <div key={index} className="mt-2">
                <label>
                  <input
                    className="me-2 ed-checkbox"
                    type="checkbox"
                    name="latte_art"
                    value={art}
                    checked={filterForm.latte_art.includes(art)}
                    onChange={handleFieldChange}
                  />
                  {art}
                </label>
              </div>
            ))}
          <hr />
        </fieldset>

        <fieldset>
          <legend
            className="mt-2 mb-3 ed-filter-title"
            onClick={() => {
              setIsPourExpanded(!isPourExpanded)
            }}
          >
            手沖課程
            <span className="arrow-icon">
              {isPourExpanded ? (
                <MdOutlineKeyboardArrowDown />
              ) : (
                <MdOutlineKeyboardArrowUp />
              )}
            </span>
          </legend>
          {isPourExpanded &&
            levels.map((pour, index) => (
              <div key={index} className="mt-2">
                <label>
                  <input
                    className="me-2 ed-checkbox"
                    type="checkbox"
                    name="pour"
                    value={pour}
                    checked={filterForm.pour.includes(pour)}
                    onChange={handleFieldChange}
                  />
                  {pour}
                </label>
              </div>
            ))}
          <hr />
        </fieldset>
        <fieldset>
          <legend
            className="mt-2 mb-3 ed-filter-title"
            onClick={() => {
              setIsRoastExpanded(!isRoastExpanded)
            }}
          >
            烘豆課程
            <span className="arrow-icon">
              {isRoastExpanded ? (
                <MdOutlineKeyboardArrowDown />
              ) : (
                <MdOutlineKeyboardArrowUp />
              )}
            </span>
          </legend>
          {isRoastExpanded &&
            levels.map((roast, index) => (
              <div key={index} className="mt-2">
                <label>
                  <input
                    className="me-2 ed-checkbox"
                    type="checkbox"
                    name="roast"
                    value={roast}
                    checked={filterForm.roast.includes(roast)}
                    onChange={handleFieldChange}
                  />
                  {roast}
                </label>
              </div>
            ))}
          <hr />
        </fieldset>
        <button className="ed-btn-filter mt-2" type="submit">
          篩選
        </button>
        <button
          className="ed-btn-filter mt-3 mb-5"
          type="button"
          onClick={resetFilter}
        >
          清除篩選
        </button>
      </form>
    </div>
  )
}

export default Accordion
