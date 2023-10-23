import React from 'react'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import _ from 'lodash'

//leaflet import
import {
  TileLayer,
  MapContainer,
  Marker,
  Popup,
  useMapEvents,
  ZoomControl,
  Tooltip,
  useMap,
} from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

//icon import
import { FaMapMarkerAlt, FaGlobeAmericas, FaCity } from 'react-icons/fa'
import { IoIosWifi } from 'react-icons/io'
import { FaArrowsLeftRightToLine } from 'react-icons/fa6'
import { LuExternalLink } from 'react-icons/lu'
import { LiaChairSolid } from 'react-icons/lia'
import { IoEarOutline } from 'react-icons/io5'
import { TbCurrentLocation } from 'react-icons/tb'
import {
  PiCoffee,
  PiCurrencyDollarSimpleBold,
  PiMusicNotesFill,
} from 'react-icons/pi'
import { BsPlugin, BsHourglassSplit, BsClock } from 'react-icons/bs'

import Lottie from 'react-lottie-player/dist/LottiePlayerLight'
// import lottieJson from '@/public/map-image/LottieFiles-cafeLoading.json'
import lottieJson from '@/public/map-image/logo-anime-30.json'

import CafeFilter from './cafeFilter'

import Swal from 'sweetalert2'

//所在地的mark樣式
const locationMarker = new L.Icon({
  iconUrl: 'http://localhost:3000/map-image/marker-icon-2x-gold.png',
  shadowUrl: 'http://localhost:3000/map-image/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})
//咖啡廳們的mark樣式
const cafesMarker = new L.Icon({
  iconUrl: 'http://localhost:3000/map-image/marker-icon-2x-grey.png',
  shadowUrl: 'http://localhost:3000/map-image/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})
//active咖啡廳的mark樣式
const activeCafeMarker = new L.Icon({
  iconUrl: 'http://localhost:3000/map-image/marker-icon-2x-blue.png',
  shadowUrl: 'http://localhost:3000/map-image/marker-shadow.png',
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
  //縣市經緯度
  const cityData = [
    {
      title: '台北',
      city: 'taipei',
      latitude: '25.040184214933014',
      longitude: '121.54353515714165',
    },
    {
      title: '基隆',
      city: 'keelung',
      latitude: '25.130044772524375',
      longitude: '121.74393340178702',
    },
    {
      title: '桃園',
      city: 'taoyuan',
      latitude: '24.99262484939432',
      longitude: '121.30151014814116',
    },
    {
      title: '新竹',
      city: 'hsinchu',
      latitude: '24.80650828794589',
      longitude: '120.96857900132484',
    },
    {
      title: '苗栗',
      city: 'miaoli',
      latitude: '24.5643355614104',
      longitude: '120.82065540475867',
    },
    {
      title: '台中',
      city: 'taichung',
      latitude: '24.149408477164396',
      longitude: '120.66474765872205',
    },
    {
      title: '南投',
      city: 'nantou',
      latitude: '23.97798219670314',
      longitude: '120.68411494973638',
    },
    {
      title: '彰化',
      city: 'changhua',
      latitude: '24.07859709640672',
      longitude: '120.54037652645667',
    },
    {
      title: '雲林',
      city: 'yunlin',
      latitude: '23.710222543551886',
      longitude: '120.54211815343298',
    },
    {
      title: '嘉義',
      city: 'chiayi',
      latitude: '23.481614353403845',
      longitude: '120.45405498545355',
    },
    {
      title: '台南',
      city: 'tainan',
      latitude: '22.992593938243726',
      longitude: '120.20499449471403',
    },
    {
      title: '高雄',
      city: 'kaohsiung',
      latitude: '22.63155407266006',
      longitude: '120.30191720502906',
    },
    {
      title: '屏東',
      city: 'pingtung',
      latitude: '22.674766982472086',
      longitude: '120.48971312136167',
    },
    {
      title: '宜蘭',
      city: 'yilan',
      latitude: '24.75429428723912',
      longitude: '121.7519009319021',
    },
    {
      title: '花蓮',
      city: 'hualien',
      latitude: '23.978023503835665',
      longitude: '121.60851562963362',
    },
    {
      title: '台東',
      city: 'taitung',
      latitude: '22.761462552832683',
      longitude: '121.14389869046911',
    },
    {
      title: '澎湖',
      city: 'penghu',
      latitude: '23.566357398577793',
      longitude: '119.56531305026361',
    },
  ]
  //縣市select用
  const inputOptions = {}
  cityData.forEach((city) => {
    inputOptions[city.city] = city.title
  })
  const [selectedCity, setSelectedCity] = useState(null)
  //定位位置
  const [position, setPosition] = useState(null)
  //定位啟動
  const [triggerLocate, setTriggerLocate] = useState(false)
  //咖啡廳清單資料
  const [cafes, setCafes] = useState([])
  //所有咖啡廳
  const [allCafeData, setAllCafeData] = useState(null)
  //取得咖啡廳資料
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/fetchCafeData')
        //這邊之後可以新增如果api沒拿到資料的話要怎麼做
        const data = response.data
        await setAllCafeData(data)
        //預設顯示桃園咖啡
        // const defaultCafeData = _.filter(data, { city: 'taoyuan' })
        // setCafes(defaultCafeData)
        setTimeout(() => {
          setShowLoading(false)
        }, 300)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])
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
  //是否顯示咖啡廳資料視窗
  const [showCafeInfo, setShowCafeInfo] = useState(false)
  //是否顯示Loading
  const [showLoading, setShowLoading] = useState(true)
  //要生成Mark的資料預設
  const [markData, setMarkData] = useState(cafes)
  //咖啡rating篩選條件預設
  const [filterValues, setFilterValues] = useState({
    wifi: '0',
    seat: '0',
    quiet: '0',
  })

  //監聽filterValues或cafes更改時，Rating篩選咖啡店，重新渲染list和mark
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
          cafe.quiet >= parseInt(filterValues.quiet))
      )
    })

    // 將篩選後的咖啡店儲存到cafesFiltered狀態中
    setCafesFiltered(filteredCafes)
    //然後更新Marks渲染
    setMarkData(filteredCafes)
  }, [filterValues, cafes])

  //顯示距離預設
  const [distanceRangeKm, setDistanceRangeKm] = useState(3)

  // 在distanceRangeKm發生改變時重新渲染咖啡廳數據
  useEffect(() => {
    if (position) {
      const cafesWithDistance = _.map(allCafeData, (cafe) => {
        const cafeLat = parseFloat(cafe.latitude)
        const cafeLng = parseFloat(cafe.longitude)
        const distanceInKm = distanceCount(
          position.lat,
          position.lng,
          cafeLat,
          cafeLng,
          'K'
        )
        if (distanceInKm <= distanceRangeKm) {
          return {
            ...cafe,
            distanceInKm,
          }
        }
        return null
      })
      const filteredCafes = _.filter(cafesWithDistance, (cafe) => cafe !== null)
      const sortedCafes = _.orderBy(filteredCafes, 'distanceInKm', 'asc')
      setCafes(sortedCafes)
    }
  }, [position, distanceRangeKm, allCafeData])

  //=====================生成系列，未來可拆component================
  //生成cafeMarks
  function CafesMarker({ cafes }) {
    return (
      <>
        {cafes.map((cafe, i) => {
          if (parseFloat(cafe.latitude) !== 0) {
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
              ></Marker>
            )
          } else {
            return null // 如果cafe.latitude等於0，則不建立Marker
          }
        })}
      </>
    )
  }

  //生成定位Mark
  function LocationMarker() {
    const map = useMapEvents({
      locationfound(e) {
        handlePositionGet(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      },
    })
    useEffect(() => {
      if (triggerLocate) {
        map.locate()
        setTriggerLocate(false) // 重設狀態，以便下次點選按鈕時重新觸發
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [triggerLocate])

    return position === null ? null : (
      <Marker position={position} icon={locationMarker}>
        <Popup>您在這裡</Popup>
      </Marker>
    )
  }

  //生成城市Mark
  function CityMarker() {
    const map = useMap()
    if (position === null && selectedCity !== null) {
      setTimeout(() => {
        map.flyTo(
          [selectedCity.latitude, selectedCity.longitude],
          map.getZoom()
        )
      }, 100)
      return (
        <Marker
          key={'selectedCity'}
          position={[selectedCity.latitude, selectedCity.longitude]}
          icon={locationMarker}
          zIndexOffset={2}
        >
          <Tooltip direction="top" offset={[0, -40]} opacity={1} permanent>
            {selectedCity.title}
          </Tooltip>
        </Marker>
      )
    }
  }

  //生成active咖啡Mark
  function ActiveCafeMarker({ cafeData }) {
    const map = useMap()
    if (showCafeInfo) {
      setTimeout(() => {
        map.flyTo([cafeData.latitude, cafeData.longitude])
      }, 400)
      return (
        <Marker
          key={cafeData.id}
          position={[cafeData.latitude, cafeData.longitude]}
          icon={activeCafeMarker}
          zIndexOffset={2}
        >
          <Tooltip direction="top" offset={[0, -40]} opacity={1} permanent>
            {cafeData.name}
          </Tooltip>
        </Marker>
      )
    }
  }

  //生成測欄資訊
  function AsideInfo() {
    return (
      <>
        {/* 單間咖啡廳 */}
        <div className={`cafeInfo ${showCafeInfo ? '' : 'd-none'}`}>
          <div className="d-flex justify-content-between">
            <h4 className="lh-base" key={cafeData.id}>
              {cafeData.name}
            </h4>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => {
                setShowCafeInfo(false)
              }}
            ></button>
          </div>
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
            <div className="w-100">
              <div className="d-flex justify-content-between mb-3 px-1 lh-base">
                <div>
                  <BsPlugin />
                  插座數量
                </div>
                {checkValueSocket(cafeData.socket)}
              </div>
              <div className="d-flex justify-content-between px-1 lh-base">
                <div>
                  <BsHourglassSplit />
                  有無限時
                </div>
                {checkValueTime(cafeData.limited_time)}
              </div>
            </div>
          </div>
          <div className="cafeInfos">
            <h5 className="d-flex justify-content-between">
              店家資訊
              {cafeData.distanceInKm != null && (
                <span className="distanceText">
                  {cafeData.distanceInKm.toFixed(1)}公里
                </span>
              )}
            </h5>
            <div className="d-flex ">
              <FaMapMarkerAlt />
              <h6>{cafeData.address.replace(/^\d+/, '')}</h6>
            </div>

            <div className={`d-flex  ${cafeData.open_time ? '' : 'd-none'}`}>
              <BsClock />
              <h6>{cafeData.open_time}</h6>
            </div>
            <div className={`d-flex  ${cafeData.url ? '' : 'd-none'}`}>
              <FaGlobeAmericas />
              <h6>
                <a href={cafeData.url} target="_blank">
                  {cafeData.url}{' '}
                </a>
              </h6>
            </div>
          </div>
          <div className="googleMapLink mt-3 text-end">
            <a
              className="icon-link icon-link-hover"
              href={`https://www.google.com/maps/search/${cafeData.address}+${cafeData.name}`}
              target="_blank"
            >
              在GoogleMap打開
              <LuExternalLink />
            </a>
          </div>
        </div>
      </>
    )
  }
  //====================handle函式系列========================
  //切換單間咖啡廳資料
  function handelChangeCafe(cafe) {
    setShowCafeInfo(true)
    setCafeData(cafe)
    setSelectedCity(null)
  }

  //切換城市事件
  function HandleChangeCity(e) {
    setPosition(null)
    setShowCafeInfo(false)
    let newData = _.filter(allCafeData, { city: e.target.value })
    setCafes(newData)
    let targetCity = _.find(cityData, { city: e.target.value })
    setSelectedCity(targetCity)
  }
  //Swal城市選擇
  function SwalCitySelect(city) {
    let newData = _.filter(allCafeData, { city: city })
    setCafes(newData)
    let targetCity = _.find(cityData, { city: city })
    setSelectedCity(targetCity)
    const selectElement = selectCityRef.current
    if (selectElement) {
      selectElement.value = city
    }
  }

  //切換顯示距離事件
  function HandleChangeDistance(e) {
    setShowCafeInfo(false)
    let newKm = e.target.value
    setDistanceRangeKm(newKm)
  }

  //成功取得定位事件
  function handlePositionGet(position) {
    selectCityRef.current.value = ''
    setPosition(position)
    setSelectedCity(null)
    console.log(JSON.stringify(position))
  }
  //===================輔助用函式(不生成物件)==================================
  //經緯度換算距離
  function distanceCount(lat1, lon1, lat2, lon2, unit) {
    if (lat1 == lat2 && lon1 == lon2) {
      return 0
    } else {
      var radlat1 = (Math.PI * lat1) / 180
      var radlat2 = (Math.PI * lat2) / 180
      var theta = lon1 - lon2
      var radtheta = (Math.PI * theta) / 180
      var dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
      if (dist > 1) {
        dist = 1
      }
      dist = Math.acos(dist)
      dist = (dist * 180) / Math.PI
      dist = dist * 60 * 1.1515
      if (unit == 'K') {
        dist = dist * 1.609344
      }
      if (unit == 'N') {
        dist = dist * 0.8684
      }
      return dist
    }
  }

  //點擊定位按鈕
  function LocateBtn() {
    setTriggerLocate(true) // 當按鈕被點選時，設定狀態以觸發定位
    setShowCafeInfo(false)
    setSelectedCity(null)
  }

  //咖啡廳資料轉換成文字
  function checkValueTime(value) {
    switch (value) {
      case 'yes':
        return <div>一律有限時</div>
      case 'no':
        return <div>一律不限時</div>
      case 'maybe':
        return <div>假日或客滿有限時</div>
      default:
        return <div>目前無資料</div>
    }
  }
  function checkValueSocket(value) {
    switch (value) {
      case 'yes':
        return <div>很多</div>
      case 'no':
        return <div>很少</div>
      case 'maybe':
        return <div>還好，看座位</div>
      default:
        return <div>目前無資料</div>
    }
  }
  //========ref宣告區===========
  const selectCityRef = useRef(null)
  //============Swal===========
  useEffect(() => {
    if (allCafeData !== null)
      Swal.fire({
        title:
          '<h5 class="lh-base">歡迎來到咖啡地圖<br/>尋找最適合的咖啡角落！</h5><hr/><h6 class="lh-base">請選擇想要前往的城市<br/>或是使用定位顯示附近的咖啡廳。</h6>',
        input: 'select',
        inputOptions: inputOptions,
        inputValue: 'taoyuan', // 設定桃園為默認選項
        showDenyButton: true,
        denyButtonColor: '#1c262c',
        inputAttributes: {
          style: 'width:55%',
        },
        confirmButtonText: '前往',
        denyButtonText: '附近搜索',
        customClass: {
          actions: 'd-flex position-relative mapSwalAction ',
          confirmButton: 'mapSwalCityBtn position-absolute',
          denyButton: '',
          popup: 'mapSwalPopup',
        },
      }).then((result) => {
        if (result.isConfirmed) {
          const selectedCity = result.value
          console.log('你選擇的城市是：', selectedCity)
          SwalCitySelect(selectedCity)
        }
        if (result.isDenied) {
          document.getElementById('location').click()
        }
      })
    return () => {
      //離開元件時關閉Swal
      Swal.close()
    }
  }, [allCafeData])

  //========================本體return====================
  return (
    <>
      <div
        className={`mapArea loading justify-content-center align-items-center ${
          showLoading ? '' : 'd-none'
        }`}
      >
        <Lottie
          play
          loop
          style={{ width: 200, height: 200 }}
          animationData={lottieJson}
        />
      </div>
      <div className="mapArea">
        <div className="mapControl">
          <div className="rangeSelect me-3">
            <div>
              <FaCity />
            </div>

            <select
              defaultValue={''}
              onChange={(e) => HandleChangeCity(e)}
              ref={selectCityRef}
              name={'選擇城市'}
              aria-label={'選擇城市'}
            >
              <option disabled value="">
                城市
              </option>
              {cityData.map((city, i) => (
                <option key={i} value={city.city}>
                  {city.title}
                </option>
              ))}
            </select>
          </div>

          <div
            className={`rangeSelect me-3 ${position === null ? 'd-none' : ''}`}
          >
            <div>
              <FaArrowsLeftRightToLine />
            </div>
            <select
              onChange={(e) => HandleChangeDistance(e)}
              name={'選擇顯示距離'}
              aria-label={'選擇顯示距離'}
            >
              <option value={3}>附近 3公里</option>
              <option value={2}>附近 2公里</option>
              <option value={1}>附近 1公里</option>
            </select>
          </div>
          <button
            className="locateBtn"
            id="location"
            type="button"
            onClick={LocateBtn}
            title={'啟動定位'}
            aria-label={'啟動定位'}
          >
            <TbCurrentLocation />
          </button>
        </div>
        <aside className="mapAsideInfo">
          <AsideInfo />
          <CafeFilter
            setFilterValues={setFilterValues}
            cafesFiltered={cafesFiltered}
            handleCafeClick={handelChangeCafe}
            setShowCafeInfo={setShowCafeInfo}
          />
        </aside>

        <MapContainer
          className="map"
          center={[defaultLocation.latitude, defaultLocation.longitude]}
          zoom={15}
          scrollWheelZoom={true}
          zoomControl={false}
        >
          <TileLayer
            attribution='Data:<a href="https://cafenomad.tw/developers/docs/v1.2">CafeNomad</a>|&copy;<a href="http://cartodb.com/attributions">CartoDB</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png"
          />
          <ZoomControl position="topright" />
          <CafesMarker cafes={markData} />
          <ActiveCafeMarker cafeData={cafeData} />
          <LocationMarker />
          <CityMarker />
        </MapContainer>
      </div>
    </>
  )
}
