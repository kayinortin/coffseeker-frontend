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
import { FaMapMarkerAlt } from 'react-icons/fa'
import { IoIosWifi } from 'react-icons/io'
import { LiaChairSolid } from 'react-icons/lia'
import { IoEarOutline, IoStarSharp } from 'react-icons/io5'
import { TbCurrentLocation } from 'react-icons/tb'
import { PiCoffee } from 'react-icons/pi'

import style from '../../styles/_map.module.scss'

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
  const [asideInfo, setAsideInfo] = useState('all')

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
                  setAsideInfo('cafe')
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

  //測欄資訊
  function AsideInfo() {
    return (
      <>
        <div className={style.cafeList}>
          {cafes.map((cafe, i) => {
            return (
              <>
                <div className={style.cafeinfo}>
                  <h4 key={cafe.id}>{cafe.name}</h4>
                  <p>
                    <FaMapMarkerAlt />
                    {cafe.address}
                  </p>
                  <p>
                    <span>
                      <IoIosWifi />
                      {cafe.wifi}
                      <IoStarSharp />
                    </span>
                    <span>
                      <LiaChairSolid />
                      {cafe.seat}
                      <IoStarSharp />
                    </span>
                    <span>
                      <IoEarOutline />
                      {cafe.quiet}
                      <IoStarSharp />
                    </span>
                    <span>
                      <PiCoffee />
                      {cafe.tasty}
                      <IoStarSharp />
                    </span>
                  </p>
                </div>
              </>
            )
          })}
        </div>
      </>
    )
  }

  return (
    <>
      <div className={style.mapArea}>
        <div className={style.mapControl}>
          <button type="button" onClick={LocateBtn}>
            <TbCurrentLocation />
          </button>
        </div>
        <nav className={style.asideBar}>
          <button
            onClick={() => {
              setAsideInfo('all')
            }}
          >
            全部
          </button>
          <button
            onClick={() => {
              setAsideInfo('filter')
            }}
          >
            篩選
          </button>
        </nav>
        <aside className={style.asideInfo}>
          <AsideInfo />
        </aside>

        <MapContainer
          className={style.map}
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
