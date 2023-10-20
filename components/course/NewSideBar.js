import React, { useState } from 'react'
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from 'react-icons/md'
import axios from 'axios'

function Accordion(props) {
  const [isCourseNameExpanded, setIsCourseNameExpanded] = useState(true)
  const [isCourseLevelExpanded, setIsCourseLevelExpanded] = useState(true)
  const [filterForm, setFilterForm] = useState({
    course_name: [],
    course_level_id: [],
  })
  const course_name = ['拉花', '烘豆', '手沖']
  const levels = ['入門', '進階', '高階', '證照']

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    let queryString = `http://localhost:3005/api/course/qs?`
    if (filterForm.course_name) {
      queryString += `course_name=${filterForm.course_name.join(',')}&`
    }
    if (filterForm.course_level_id) {
      queryString += `course_level_id=${filterForm.course_level_id.join(',')}&`
    }

    try {
      const response = await axios.get(queryString)
      props.onFilter(response.data.data)
      // console.log(response)
    } catch (err) {
      console.log(err)
    }
  }

  const handleFieldChange = (e) => {
    const { name, value, checked } = e.target

    if (name === 'course_name' || name === 'course_level_id') {
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

  const resetFilter = async () => {
    setFilterForm({ course_name: [], course_level_id: [] })
    try {
      const response = await axios.get('http://localhost:3005/api/course/qs')
      props.onFilter(response.data.data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="col-sm-2 d-none d-sm-block text-center my-5 me-5">
      <form onSubmit={handleFormSubmit}>
        <fieldset>
          <div
            className="mt-2 mb-3 ed-filter-title"
            onClick={() => setIsCourseNameExpanded(!isCourseNameExpanded)}
            role="button"
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                setIsCourseNameExpanded(!isCourseNameExpanded)
              }
            }}
            tabIndex={0}
          >
            課程種類
            <span className="arrow-icon">
              {isCourseNameExpanded ? (
                <MdOutlineKeyboardArrowDown />
              ) : (
                <MdOutlineKeyboardArrowUp />
              )}
            </span>
          </div>
          {/* 拉花 */}
          {isCourseNameExpanded &&
            course_name.map((course_name, index) => (
              <div key={index} className="mt-2">
                <label>
                  <input
                    className="me-2 ed-checkbox"
                    type="checkbox"
                    name="course_name"
                    value={course_name}
                    checked={filterForm.course_name.includes(course_name)}
                    onChange={handleFieldChange}
                  />
                  {course_name}
                </label>
              </div>
            ))}
          <hr />
        </fieldset>

        <fieldset>
          <div
            className="mt-2 mb-3 ed-filter-title"
            onClick={() => setIsCourseLevelExpanded(!isCourseLevelExpanded)}
            role="button"
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                setIsCourseLevelExpanded(!isCourseLevelExpanded)
              }
            }}
            tabIndex={0}
          >
            課程等級
            <span className="arrow-icon">
              {isCourseLevelExpanded ? (
                <MdOutlineKeyboardArrowDown />
              ) : (
                <MdOutlineKeyboardArrowUp />
              )}
            </span>
          </div>
          {isCourseLevelExpanded &&
            levels.map((course_level_id, index) => (
              <div key={index} className="mt-2">
                <label>
                  <input
                    className="me-2 ed-checkbox"
                    type="checkbox"
                    name="course_level_id"
                    value={course_level_id}
                    checked={filterForm.course_level_id.includes(
                      course_level_id
                    )}
                    onChange={handleFieldChange}
                  />
                  {course_level_id}
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
