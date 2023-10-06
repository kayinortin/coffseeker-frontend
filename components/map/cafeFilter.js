// CafeFilter.js
import { IoIosWifi } from 'react-icons/io'
import { LiaChairSolid } from 'react-icons/lia'
import { IoEarOutline } from 'react-icons/io5'
import { PiCoffee } from 'react-icons/pi'
import { BsPlugin } from 'react-icons/bs'
import CafeList from './cafeList'
export default function CafeFilter({
  filterValues,
  handleCriteriaChange,
  cafesFiltered,
  handleCafeClick,
}) {
  const criteria = [
    { icon: <IoIosWifi />, label: '網路', name: 'wifi' },
    { icon: <LiaChairSolid />, label: '座位', name: 'seat' },
    { icon: <IoEarOutline />, label: '安靜', name: 'quiet' },
    { icon: <PiCoffee />, label: '好喝', name: 'tasty' },
    { icon: <BsPlugin />, label: '插座', name: 'socket' },
  ]

  return (
    <div className="cafeFilter">
      <h4>篩選條件</h4>
      <div className="cafeFilterForm py-3">
        {criteria.map((item) => (
          <div key={item.name}>
            <div className="d-flex align-items-center">
              {item.icon}
              <p className="">{item.label}</p>
            </div>
            <select
              name={item.name}
              onChange={handleCriteriaChange}
              value={filterValues[item.name]}
            >
              <option defaultValue value="">
                不限
              </option>
              {item.name === 'socket' ? (
                <>
                  <option value="yes">充足</option>
                  <option value="maybe">也許</option>
                  <option value="no">很少</option>
                </>
              ) : (
                [5, 4, 3, 2, 1].map((value) => (
                  <option key={value} value={value}>
                    {value}★
                  </option>
                ))
              )}
            </select>
          </div>
        ))}
      </div>

      <h4 className="my-3">篩選結果</h4>
      <div className="">
        <CafeList cafes={cafesFiltered} handleCafeClick={handleCafeClick} />
      </div>
    </div>
  )
}
