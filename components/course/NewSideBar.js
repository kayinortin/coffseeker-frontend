import React, { useState } from 'react'
import Link from 'next/link'
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from 'react-icons/md'
import ReactSlider from 'react-slider'

function Accordion() {
  const [isArtExpanded, setIsArtExpanded] = useState(true)
  const [isPourExpanded, setIsPourExpanded] = useState(false)
  const [isRoastExpanded, setIsRoastExpanded] = useState(false)
  const [filterForm, setFilterForm] = useState({latte_art:[],pour:[],roast:[]})
  const levels = ['入門', '進階', '高階', '證照']

  const handleFormSubmit=(e)=>{
    e.preventDefault()

    
  }

  const handleFieldChange=()=>{

  }

  const resetFilter=()=>{
    setFilterForm({latte_art:[],pour:[],roast:[]})
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
            levels.map((art, index) => {
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
            })}
            <hr/>
        </fieldset>

        <fieldset>
          <legend className="mt-2 mb-3 ed-filter-title">
            手沖課程
            <span className="arrow-icon">
              {isPourExpanded ? (
                <MdOutlineKeyboardArrowDown />
              ) : (
                <MdOutlineKeyboardArrowUp />
              )}
            </span>
          </legend>
          <hr/>
        </fieldset>
        <fieldset>
          <legend className="mt-2 mb-3 ed-filter-title">
            烘豆課程
            <span className="arrow-icon">
              {isRoastExpanded ? (
                <MdOutlineKeyboardArrowDown />
              ) : (
                <MdOutlineKeyboardArrowUp />
              )}
            </span>
          </legend>
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
