import React from 'react'
import { useState, useEffect } from 'react'
import _ from 'lodash'
import {
  TileLayer,
  MapContainer,
  Marker,
  Popup,
  useMapEvents,
  ZoomControl,
} from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

//icon import
import { FaMapMarkerAlt, FaGlobeAmericas } from 'react-icons/fa'
import { IoIosWifi } from 'react-icons/io'
import { LiaChairSolid } from 'react-icons/lia'
import { IoEarOutline } from 'react-icons/io5'
import { TbCurrentLocation } from 'react-icons/tb'
import {
  PiCoffee,
  PiCurrencyDollarSimpleBold,
  PiMusicNotesFill,
} from 'react-icons/pi'
import {
  BsPlugin,
  BsXLg,
  BsCheckLg,
  BsQuestionLg,
  BsHourglassSplit,
  BsDashLg,
  BsClock,
} from 'react-icons/bs'

import testData from '@/data/map/taoyuanCafe.json'
//所在地的mark樣式
const locationMarker = new L.Icon({
  iconUrl:
    'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})
//咖啡廳們的mark樣式
const cafesMarker = new L.Icon({
  iconUrl:
    'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

export default function Map() {
  //預設位置
  const defaultLocation = {
    latitude: 24.985415107645835,
    longitude: 121.22215559142012,
  }
  //定位位置
  const [position, setPosition] = useState(null)
  //定位啟動
  const [triggerLocate, setTriggerLocate] = useState(false)
  //咖啡廳清單資料
  const [cafes, setCafes] = useState(testData)
  //rating篩選後的咖啡廳清單資料
  const [cafesFiltered, setCafesFiltered] = useState([])
  //單間咖啡廳資料
  const [cafeData, setCafeData] = useState({
    id: '5125fe57-2ad1-4b42-af15-f9bde1f08fc6',
    name: 'Want Cafe 玩咖咖啡館',
    city: 'taoyuan',
    wifi: 5,
    seat: 5,
    quiet: 4,
    tasty: 4,
    cheap: 3,
    music: 4,
    url: 'https://www.facebook.com/WantCafe/',
    address: '桃園市中壢區環北路167號',
    latitude: '24.96667800',
    longitude: '121.22142500',
    limited_time: 'no',
    socket: 'yes',
    standing_desk: 'no',
    mrt: '',
    open_time: '主要是六日營業，其他以教學為主',
  })
  //側面欄顯示(全部all/單間cafe/篩選filter)
  const [asideInfoIndex, setAsideInfoIndex] = useState('all')
  //要生成Mark的資料預設
  const [markData, setMarkData] = useState(cafes)
  //咖啡rating篩選條件預設
  const [filterValues, setFilterValuesValues] = useState({
    wifi: '',
    seat: '',
    quiet: '',
    tasty: '',
    socket: '',
  })
  //監聽filterValues和cafes更改，Rating篩選咖啡店
  useEffect(() => {
    // 使用lodash的_.filter函數篩選咖啡店
    const filteredCafes = _.filter(cafes, (cafe) => {
      // 對每個條件進行篩選
      return (
        (filterValues.wifi === '' ||
          cafe.wifi >= parseInt(filterValues.wifi)) &&
        (filterValues.seat === '' ||
          cafe.seat >= parseInt(filterValues.seat)) &&
        (filterValues.quiet === '' ||
          cafe.quiet >= parseInt(filterValues.quiet)) &&
        (filterValues.tasty === '' ||
          cafe.tasty >= parseInt(filterValues.tasty)) &&
        (filterValues.socket === '' || cafe.socket === filterValues.socket)
      )
    })

    // 將篩選後的咖啡店儲存到cafesFiltered狀態中
    setCafesFiltered(filteredCafes)
    //然後更新Marks渲染
    setMarkData(filteredCafes)
  }, [filterValues, cafes])

  //篩選條件預設
  const criteria = [
    { icon: <IoIosWifi />, label: '網路', name: 'wifi' },
    { icon: <LiaChairSolid />, label: '座位', name: 'seat' },
    { icon: <IoEarOutline />, label: '安靜', name: 'quiet' },
    { icon: <PiCoffee />, label: '好喝', name: 'tasty' },
    { icon: <BsPlugin />, label: '插座', name: 'socket' },
  ]
  //監聽aside切換顯示
  useEffect(() => {
    console.log(asideInfoIndex)
  }, [asideInfoIndex])

  //生成系列，未來可拆component
  //生成cafeMarks
  function CafesMarker({ cafes }) {
    return (
      <>
        {cafes.map((cafe, i) => (
          <Marker
            key={i}
            position={[cafe.latitude, cafe.longitude]}
            icon={cafesMarker}
            eventHandlers={{
              click: () => {
                handelChangeCafe(cafe)
              },
            }}
          >
            <Popup>{cafe.name}</Popup>
          </Marker>
        ))}
      </>
    )
  }

  //生成定位Mark
  function LocationMarker() {
    const map = useMapEvents({
      locationfound(e) {
        setPosition(e.latlng)
        // console.log(e)
        map.flyTo(e.latlng, map.getZoom())
      },
    })
    useEffect(() => {
      if (triggerLocate) {
        map.locate()
        setTriggerLocate(false) // 重設狀態，以便下次點選按鈕時重新觸發
      }
    }, [triggerLocate])

    return position === null ? (
      <Marker
        position={[defaultLocation.latitude, defaultLocation.longitude]}
        icon={locationMarker}
      >
        <Popup>
          預設地點 <br /> 桃園基督學院
        </Popup>
      </Marker>
    ) : (
      <Marker position={position} icon={locationMarker}>
        <Popup>You are here</Popup>
      </Marker>
    )
  }
  //生成咖啡店LIST
  function CafeList({ cafes }) {
    return (
      <>
        {cafes.length == 0 ? (
          <p className="text-center">查無資料，請重設篩選條件</p>
        ) : (
          <p className="text-end">共{cafes.length}家</p>
        )}

        {cafes.map((cafe) => (
          <button
            key={cafe.id}
            className="cafeItem border-0 border-bottom grid gap-3 d-flex flex-column py-3 border-black"
            onClick={() => {
              handelChangeCafe(cafe)
            }}
          >
            <h4>{cafe.name}</h4>
            <h6>
              <FaMapMarkerAlt />
              {cafe.address}
            </h6>
            <p>
              <span>
                <IoIosWifi />
                {cafe.wifi}★
              </span>
              <span>
                <LiaChairSolid />
                {cafe.seat}★
              </span>
              <span>
                <IoEarOutline />
                {cafe.quiet}★
              </span>
              <span>
                <PiCoffee />
                {cafe.tasty}★
              </span>
              <span>
                <BsPlugin />
                {checkValue(cafe.socket)}
              </span>
            </p>
          </button>
        ))}
      </>
    )
  }

  //生成測欄資訊
  function AsideInfo() {
    return (
      <>
        {/* 全部LIST */}
        <div className={`cafeList ${asideInfoIndex === 'all' ? 'active' : ''}`}>
          <CafeList cafes={cafes} />
        </div>
        {/* 單間咖啡廳 */}
        <div
          className={`cafeInfo ${asideInfoIndex === 'cafe' ? 'active' : ''}`}
        >
          <h4 key={cafeData.id}>{cafeData.name}</h4>
          <div className="cafeRating">
            <span>
              <div>
                <IoIosWifi />
                網路穩定
              </div>
              <div>{cafeData.wifi}★</div>
            </span>
            <span>
              <div>
                <LiaChairSolid />
                座位充足
              </div>
              <div>{cafeData.seat}★</div>
            </span>
            <span>
              <div>
                <IoEarOutline />
                安靜程度
              </div>
              <div>{cafeData.quiet}★</div>
            </span>
            <span>
              <div>
                <PiCoffee />
                咖啡好喝
              </div>
              <div>{cafeData.tasty}★</div>
            </span>
            <span>
              <div>
                <PiCurrencyDollarSimpleBold />
                價格實惠
              </div>
              <div>{cafeData.cheap}★</div>
            </span>
            <span>
              <div>
                <PiMusicNotesFill />
                裝潢音樂
              </div>
              <div>{cafeData.music}★</div>
            </span>
            <span>
              <div>
                <BsPlugin />
                插座數量
              </div>
              <div>{checkValue(cafeData.socket)}</div>
            </span>
            <span>
              <div>
                <BsHourglassSplit />
                有無限時
              </div>
              <div>{checkValue(cafeData.limited_time)}</div>
            </span>
          </div>
          <div className="cafeInfos">
            <h5>店家資訊</h5>
            <div className="d-flex justify-content-between ">
              <FaMapMarkerAlt />
              <h6>{cafeData.address}</h6>
            </div>

            <div
              className={`d-flex justify-content-between ${
                cafeData.open_time ? '' : 'd-none'
              }`}
            >
              <BsClock />
              <h6>{cafeData.open_time}</h6>
            </div>
            <div
              className={`d-flex justify-content-between ${
                cafeData.url ? '' : 'd-none'
              }`}
            >
              <FaGlobeAmericas />
              <h6>
                <a href={cafeData.url} target="_blank">
                  {cafeData.url}{' '}
                </a>
              </h6>
            </div>
          </div>
          <div className="googleMapLink mt-3 text-end">在GoogleMap打開</div>
        </div>
        {/* 篩選 */}
        <div
          className={`cafeFilter  ${
            asideInfoIndex === 'filter' ? 'active' : ''
          }`}
        >
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
                  {item.name === 'socket' ? ( // 只为 'socket' 的Select渲染特定选项
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
            <CafeList cafes={cafesFiltered} />
          </div>
        </div>
      </>
    )
  }
  //handle函式系列========================
  //更改條件選擇時
  const handleCriteriaChange = (e) => {
    const { name, value } = e.target
    setFilterValuesValues({ ...filterValues, [name]: value })
  }
  //切換單間咖啡廳資料
  function handelChangeCafe(cafe) {
    handleAsideInfo('cafe')
    setCafeData(cafe)
  }
  //切換Aside顯示事件
  function handleAsideInfo(params) {
    switch (params) {
      case 'all':
        setAsideInfoIndex('all')
        setMarkData(cafes)
        break
      case 'filter':
        setAsideInfoIndex('filter')
        setMarkData(cafesFiltered)
        break
      case 'cafe':
        setAsideInfoIndex('cafe')
        break
    }
    console.log(asideInfoIndex)
  }
  //輔助用函式(不生成物件)==================================
  //判斷打勾叉叉icon
  function checkValue(value) {
    switch (value) {
      case 'yes':
        return <BsCheckLg />
      case 'no':
        return <BsXLg />
      case 'maybe':
        return <BsQuestionLg />
      default:
        return <BsDashLg />
    }
  }
  //啟動定位
  function LocateBtn() {
    setTriggerLocate(true) // 當按鈕被點選時，設定狀態以觸發定位
  }
  //整體return
  return (
    <>
      <div className="mapArea">
        <div className="mapControl">
          <button type="button" onClick={LocateBtn}>
            <TbCurrentLocation />
          </button>
        </div>
        <nav className="mapAsideBar">
          <button
            className={`${asideInfoIndex === 'all' ? 'active' : ''}`}
            onClick={() => {
              handleAsideInfo('all')
            }}
          >
            全部
          </button>
          <button
            className={`${asideInfoIndex === 'filter' ? 'active' : ''}`}
            onClick={() => {
              handleAsideInfo('filter')
            }}
          >
            篩選
          </button>
        </nav>
        <aside className="mapAsideInfo">
          <AsideInfo />
        </aside>

        <MapContainer
          className="map"
          center={[defaultLocation.latitude, defaultLocation.longitude]}
          zoom={15}
          scrollWheelZoom={true}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="http://cartodb.com/attributions">CartoDB</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png"
          />
          <ZoomControl position="topright" />
          <CafesMarker cafes={markData} />
          <LocationMarker />
        </MapContainer>
      </div>
    </>
  )
}
