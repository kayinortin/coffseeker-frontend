import { useState } from 'react'
import axios from 'axios'
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
  MdFilterAlt,
} from 'react-icons/md'
import ReactSlider from 'react-slider'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

export default function FilterMobile(props) {
  const [currentPage, setCurrentPage] = useState(1)
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [priceRange, setPriceRange] = useState([100, 5000])
  const [filterForm, setFilterForm] = useState({
    origin: [],
    Roast_degree: [],
    Processing: [],
    Variety: [],
    description: [],
  })

  const [isDegreeExpanded, setDegreeExpanded] = useState(true)
  const roastDegrees = ['淺烘焙', '中淺焙', '中焙', '中深焙', '深焙']
  const [isOriginExpanded, setOriginExpanded] = useState(false)
  const origins = [
    '哥倫比亞',
    '巴西',
    '肯亞',
    '印尼',
    '瓜地馬拉',
    '衣索比亞',
    '墨西哥',
    '巴拿馬',
    '印度',
    '美國',
    '牙買加',
  ]
  const [isProcessingExpanded, setProcessingExpanded] = useState(false)
  const Processing = ['日曬', '水洗', '濕剝', '風漬']
  const [isVarietyExpanded, setVarietyExpanded] = useState(false)
  const Varieties = [
    'Arabic',
    'Geisha',
    'Yellow Bourbon',
    'Caturra',
    'Colombia',
    'Castillo',
    'Typica',
    'Catimors',
  ]
  const [isDescriptExpanded, setDescriptExpanded] = useState(false)
  const Descriptions = [
    '甜橙',
    '水蜜桃',
    '茉莉花',
    '藍莓',
    '葡萄',
    '檸檬',
    '柑橘',
    '香草',
    '堅果',
    '紅茶',
    '太妃糖',
    '焦糖',
    '奶香',
    '百香果',
    '荔枝',
    '巧克力',
    '南洋',
    '杏仁',
    '木質',
  ]

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    let queryString = `http://localhost:3005/api/products/qs?`
    queryString += `price_range=${priceRange.join(',')}&`
    if (filterForm.origin.length) {
      queryString += `origin=${filterForm.origin.join(',')}&`
    }
    if (filterForm.Roast_degree) {
      queryString += `Roast_degree=${filterForm.Roast_degree.join(',')}&`
    }
    if (filterForm.Processing) {
      queryString += `Processing=${filterForm.Processing.join(',')}&`
    }
    if (filterForm.Variety) {
      queryString += `Variety=${filterForm.Variety.join(',')}&`
    }
    if (filterForm.description) {
      queryString += `description=${filterForm.description.join(',')}&`
    }

    try {
      const response = await axios.get(queryString)
      props.onFilter(response.data.data)
      setCurrentPage(1)
    } catch (error) {
      console.error(error)
    }
  }

  const handleFieldChange = (e) => {
    const { name, value, checked } = e.target

    if (
      name === 'origin' ||
      name === 'Roast_degree' ||
      name === 'Processing' ||
      name === 'Variety' ||
      name === 'description'
    ) {
      setFilterForm((prevState) => ({
        ...prevState,
        [name]: checked
          ? [...prevState[name], value]
          : prevState[name].filter((item) => item !== value),
      }))
    } else {
      setFilterForm((prevState) => ({
        ...prevState,
        [name]: value,
      }))
    }
  }

  const resetFilter = async () => {
    setFilterForm({
      origin: [],
      Roast_degree: [],
      Processing: [],
      Variety: [],
      description: [],
    })

    setPriceRange([100, 5000])

    try {
      const response = await axios.get('http://localhost:3005/api/products/qs')
      props.onFilter(response.data.data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      {/* 打開篩選器的按鈕 */}
      <Button onClick={handleShow} className="ed-filter-mobile-btn">
        <MdFilterAlt />
      </Button>

      {/* Modal 篩選器 */}
      <Modal show={show} onHide={handleClose} centered className="mt-4">
        <Modal.Header closeButton>
          <h5>擇你所愛，忠於原味</h5>
        </Modal.Header>
        <Modal.Body>
          <div className="mt-4">
            <form onSubmit={handleFormSubmit}>
              <div className="price-slider-container">
                <p className="ed-filter-title">價格區間</p>
                <ReactSlider
                  className="horizontal-slider"
                  thumbClassName="thumb"
                  trackClassName="track"
                  value={priceRange}
                  onChange={setPriceRange}
                  min={100}
                  max={5000}
                  pearling
                  step={100}
                  minDistance={100}
                />
                <div className="price-labels">
                  <span>{priceRange[0]} 元</span>
                  <span>{priceRange[1]} 元</span>
                </div>
              </div>
              {/* 產區 */}
              <fieldset>
                <div
                  className="mt-2 mb-3 ed-filter-title"
                  role="button"
                  onClick={() => setOriginExpanded(!isOriginExpanded)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      setOriginExpanded(!isOriginExpanded)
                    }
                  }}
                  tabIndex={0}
                >
                  產地
                  <span className="arrow-icon">
                    {isOriginExpanded ? (
                      <MdOutlineKeyboardArrowDown />
                    ) : (
                      <MdOutlineKeyboardArrowUp />
                    )}
                  </span>
                </div>

                {isOriginExpanded &&
                  origins.map((origin, index) => (
                    <div key={index} className="mt-2">
                      <label>
                        <input
                          type="checkbox"
                          name="origin"
                          value={origin}
                          onChange={handleFieldChange}
                          className="me-2 ed-checkbox"
                          checked={filterForm.origin.includes(origin)}
                        />
                        {origin}
                      </label>
                    </div>
                  ))}
                <hr />
              </fieldset>

              {/* 烘焙程度 */}
              <fieldset>
                <div
                  className="mt-2 mb-3 ed-filter-title"
                  onClick={() => setDegreeExpanded(!isDegreeExpanded)}
                  role="button"
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      setOriginExpanded(!isOriginExpanded)
                    }
                  }}
                  tabIndex={0}
                >
                  烘焙程度
                  <span className="arrow-icon">
                    {isDegreeExpanded ? (
                      <MdOutlineKeyboardArrowDown />
                    ) : (
                      <MdOutlineKeyboardArrowUp />
                    )}
                  </span>
                </div>
                {isDegreeExpanded &&
                  roastDegrees.map((degree, index) => (
                    <div key={index} className="mt-2">
                      <label>
                        <input
                          type="checkbox"
                          name="Roast_degree"
                          value={degree}
                          checked={filterForm.Roast_degree.includes(degree)}
                          onChange={handleFieldChange}
                          className="me-2 ed-checkbox"
                        />
                        {degree}
                      </label>
                    </div>
                  ))}
                <hr />
              </fieldset>

              {/* 處理方法 */}
              <fieldset>
                <div
                  className="mt-2 mb-3 ed-filter-title"
                  onClick={() => setProcessingExpanded(!isProcessingExpanded)}
                  role="button"
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      setOriginExpanded(!isOriginExpanded)
                    }
                  }}
                  tabIndex={0}
                >
                  處理方法
                  <span className="arrow-icon">
                    {isProcessingExpanded ? (
                      <MdOutlineKeyboardArrowDown />
                    ) : (
                      <MdOutlineKeyboardArrowUp />
                    )}
                  </span>
                </div>
                {isProcessingExpanded &&
                  Processing.map((Processing, index) => (
                    <div key={index} className="mt-2">
                      <label>
                        <input
                          type="checkbox"
                          name="Processing"
                          value={Processing}
                          checked={filterForm.Processing.includes(Processing)}
                          onChange={handleFieldChange}
                          className="me-2 ed-checkbox"
                        />
                        {Processing}
                      </label>
                    </div>
                  ))}
                <hr />
              </fieldset>

              {/* 咖啡品種 */}
              <fieldset>
                <div
                  className="mt-2 mb-3 ed-filter-title"
                  onClick={() => setVarietyExpanded(!isVarietyExpanded)}
                  role="button"
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      setOriginExpanded(!isOriginExpanded)
                    }
                  }}
                  tabIndex={0}
                >
                  品種
                  <span className="arrow-icon">
                    {isVarietyExpanded ? (
                      <MdOutlineKeyboardArrowDown />
                    ) : (
                      <MdOutlineKeyboardArrowUp />
                    )}
                  </span>
                </div>
                {isVarietyExpanded &&
                  Varieties.map((variety, index) => (
                    <div key={index} className="mt-2">
                      <label>
                        <input
                          type="checkbox"
                          name="Variety"
                          value={variety}
                          onChange={handleFieldChange}
                          className="me-2 ed-checkbox"
                          checked={filterForm.Variety.includes(variety)}
                        />
                        {variety}
                      </label>
                    </div>
                  ))}
                <hr />
              </fieldset>

              {/* 咖啡風味 */}
              <fieldset>
                <div
                  className="mt-2 mb-3 ed-filter-title"
                  onClick={() => setDescriptExpanded(!isDescriptExpanded)}
                  role="button"
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      setOriginExpanded(!isOriginExpanded)
                    }
                  }}
                  tabIndex={0}
                >
                  風味
                  <span className="arrow-icon">
                    {isDescriptExpanded ? (
                      <MdOutlineKeyboardArrowDown />
                    ) : (
                      <MdOutlineKeyboardArrowUp />
                    )}
                  </span>
                </div>
                {isDescriptExpanded &&
                  Descriptions.map((description, index) => (
                    <div key={index} className="mt-2">
                      <label>
                        <input
                          type="checkbox"
                          name="description"
                          value={description}
                          onChange={handleFieldChange}
                          className="me-2 ed-checkbox"
                          checked={filterForm.description.includes(description)}
                        />
                        {description}
                      </label>
                    </div>
                  ))}
                <hr />
              </fieldset>

              <button
                className="ed-btn-filter mt-2"
                type="submit"
                onClick={handleClose}
              >
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
        </Modal.Body>
        <Modal.Footer>
          <Button className="ed-btn-close" onClick={handleClose}>
            關閉
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
