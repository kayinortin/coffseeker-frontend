// CafeFilter.js
import { useState } from 'react'
import { IoIosWifi } from 'react-icons/io'
import { LiaChairSolid } from 'react-icons/lia'
import { IoEarOutline } from 'react-icons/io5'
import { PiCoffee } from 'react-icons/pi'
import { BsPlugin } from 'react-icons/bs'
import CafeList from './cafeList'
import ReactSlider from 'react-slider'

export default function CafeFilter({
  filterValues,
  cafesFiltered,
  handleCafeClick,
  setFilterValues,
  setShowCafeInfo,
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
  const [wifiValue, setWifiValue] = useState(0)
  const [seatValue, setSeatValue] = useState(0)
  const [setQuietValue, setSetQuietValue] = useState(0)
  const handleCriteriaChange = (e) => {
    const { name, value } = e.target
    setTempFilter({ ...tempFilter, [name]: value })
  }
  //點擊送出篩選時
  const handleFilterSubmit = () => {
    setShowCafeInfo(false)
    setFilterValues({ wifi: wifiValue, seat: seatValue, quiet: setQuietValue })
  }
  return (
    <div className="cafeFilter">
      <div className="">
        <h4>篩選條件</h4>
      </div>
      <div className="cafeFilterForm py-3">
        <div className="mb-3 d-flex align-items-center">
          <div className="d-flex align-items-center">
            <IoIosWifi />
            <p className="">網路穩定</p>
          </div>
          <div>
            <p className="lh-lg">
              {wifiValue == 0 ? '不限' : `≥${wifiValue}★`}
            </p>
          </div>
          <ReactSlider
            className="map-slider"
            thumbClassName="mapThumb"
            trackClassName="mapTrack"
            value={wifiValue}
            onChange={setWifiValue}
            min={0}
            max={5}
            pearling
            step={1}
            minDistance={1}
          />{' '}
        </div>
        <div className="mb-3 d-flex align-items-center">
          <div className="d-flex align-items-center">
            <LiaChairSolid />
            <p className="">座位充足</p>
          </div>
          <div>
            <p className="lh-lg">
              {seatValue == 0 ? '不限' : `≥${seatValue}★`}
            </p>
          </div>
          <ReactSlider
            className="map-slider"
            thumbClassName="mapThumb"
            trackClassName="mapTrack"
            value={seatValue}
            onChange={setSeatValue}
            min={0}
            max={5}
            pearling
            step={1}
            minDistance={1}
            // renderThumb={(props, state) => (
            //   <div {...props}>{state.valueNow}</div>
            // )}
          />
        </div>
        <div className="mb-3 d-flex align-items-center">
          <div className="d-flex align-items-center">
            <IoEarOutline />
            <p className="">安靜程度</p>
          </div>
          <div>
            <p className="lh-lg">
              {setQuietValue == 0 ? '不限' : `≥${setQuietValue}★`}
            </p>
          </div>
          <ReactSlider
            className="map-slider"
            thumbClassName="mapThumb"
            trackClassName="mapTrack"
            value={setQuietValue}
            onChange={setSetQuietValue}
            min={0}
            max={5}
            pearling
            step={1}
            minDistance={1}
          />
        </div>
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
