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
            {item.name === 'socket' ? (
              <input
                type="range"
                className="form-range"
                name={item.name}
                onChange={handleCriteriaChange}
                value={filterValues[item.name]}
                min="1"
                max="3"
              />
            ) : (
              <>
                <input
                  type="range"
                  className="form-range"
                  name={item.name}
                  onChange={handleCriteriaChange}
                  value={filterValues[item.name]}
                  min="0"
                  max="5"
                  list="tickmarks"
                />
              </>
            )}
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
