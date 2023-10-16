// CafeFilter.js
import { useState } from 'react'
import { IoIosWifi } from 'react-icons/io'
import { LiaChairSolid } from 'react-icons/lia'
import { IoEarOutline } from 'react-icons/io5'
import { PiCoffee } from 'react-icons/pi'
import { BsPlugin } from 'react-icons/bs'
import CafeList from './cafeList'

export default function CafeFilter({
  filterValues,
  cafesFiltered,
  handleCafeClick,
  setFilterValues,
}) {
  const criteria = [
    { icon: <IoIosWifi />, label: '網路', name: 'wifi' },
    { icon: <LiaChairSolid />, label: '座位', name: 'seat' },
    { icon: <IoEarOutline />, label: '安靜', name: 'quiet' },
  ]
  //====================handle函式系列========================
  const [tempFilter, setTempFilter] = useState({
    wifi: '0',
    seat: '0',
    quiet: '0',
  })
  const handleCriteriaChange = (e) => {
    const { name, value } = e.target
    setTempFilter({ ...tempFilter, [name]: value })
  }
  //點擊送出篩選時
  const handleFilterSubmit = () => {
    console.log(tempFilter)
    setFilterValues(tempFilter)
  }
  return (
    <div className="cafeFilter">
      <div className="">
        <h4>篩選條件</h4>
      </div>
      <div className="cafeFilterForm py-3">
        {criteria.map((item) => (
          <div key={item.name}>
            <div className="d-flex align-items-center">
              {item.icon}
              <p className="">{item.label}</p>
            </div>

            <input
              type="range"
              className="form-range"
              name={item.name}
              onChange={handleCriteriaChange}
              defaultValue={tempFilter[item.name]}
              min="0"
              max="5"
              list="tickmarks"
            />
          </div>
        ))}
        <button className="" onClick={handleFilterSubmit}>
          送出篩選
        </button>
      </div>
      <h4 className="my-3">篩選結果</h4>
      <div className="">
        <CafeList cafes={cafesFiltered} handleCafeClick={handleCafeClick} />
      </div>
    </div>
  )
}
