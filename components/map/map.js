import React from 'react'
import { useState, useEffect } from 'react'
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
import { IoEarOutline, IoStarSharp } from 'react-icons/io5'
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
  BsGlobeAsiaAustralia,
} from 'react-icons/bs'

import testData from '@/data/map/taoyuanCafe.json'

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
  //側面欄顯示
  const [asideInfoIndex, setAsideInfoIndex] = useState('all')

  useEffect(() => {
    console.log(asideInfoIndex)
  }, [asideInfoIndex])

  //產生cafeMarks
  function CafesMarker() {
    return (
      <>
        {cafes.map((cafe, i) => {
          return (
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
          )
        })}
      </>
    )
  }

  //產生定位Mark
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

  //啟動定位
  function LocateBtn() {
    setTriggerLocate(true) // 當按鈕被點選時，設定狀態以觸發定位
  }

  //測欄資訊產生
  function AsideInfo() {
    return (
      <>
        {/* 全部LIST */}
        <div className={`cafeList ${asideInfoIndex === 'all' ? '' : 'd-none'}`}>
          <CafeList cafes={cafes} />
        </div>
        {/* 單間咖啡廳 */}
        <div
          className={`cafeInfo ${asideInfoIndex === 'cafe' ? '' : 'd-none'}`}
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
      </>
    )
  }

  //輔助用函式
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

  function handelChangeCafe(cafe) {
    setAsideInfoIndex('cafe')
    setCafeData(cafe)
  }

  function CafeList({ cafes }) {
    return (
      <>
        {cafes.map((cafe) => {
          return (
            <>
              <button
                className="cafeItem border-0 border-bottom grid gap-3 d-flex flex-column py-3 border-black"
                onClick={() => {
                  handelChangeCafe(cafe)
                }}
              >
                <h4 key={cafe.id}>{cafe.name}</h4>
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
            </>
          )
        })}
      </>
    )
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
            onClick={() => {
              setAsideInfoIndex('all')
            }}
          >
            全部
          </button>
          <button
            onClick={() => {
              setAsideInfoIndex('filter')
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
          <CafesMarker />
          <LocationMarker />
        </MapContainer>
      </div>
    </>
  )
}
