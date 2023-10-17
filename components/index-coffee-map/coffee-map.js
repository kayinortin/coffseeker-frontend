import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { IoLocation } from 'react-icons/io5'
import AOS from 'aos'

export default function CoffeeMap() {
  const [selectedData, setSelectedData] = useState(null)
  const [iconColor1, setIconColor1] = useState('red')
  const [iconColor2, setIconColor2] = useState('#ef8b90')
  const [iconColor3, setIconColor3] = useState('#ef8b90')
  const [iconColor4, setIconColor4] = useState('#ef8b90')
  const [iconColor5, setIconColor5] = useState('#ef8b90')
  const [iconColor6, setIconColor6] = useState('#ef8b90')

  const jsonData = [
    {
      id: 1,
      content:
        '巴西，這片位於南美洲的土地，以其廣闊的咖啡種植區域而聞名於世。這個國家的多樣氣候和土壤條件為咖啡豆的種植提供了理想的環境。\n\n巴西的咖啡農們精心照料著咖啡樹，等待著最佳的收成時機。無論是風味濃郁的阿拉比卡豆還是豐滿的羅布斯塔豆，巴西的咖啡一直是全球咖啡愛好者的最愛之一。',
    },
    {
      id: 2,
      content:
        '哥倫比亞，這片位於南美洲的土地，以其多變的地形和氣候而聞名，為咖啡豆的理想生長環境提供了絕佳條件。\n\n哥倫比亞咖啡農們悉心照料著每一棵咖啡樹，追求卓越品質。高山區域的咖啡豆，如卡托蓮娜、安地斯和瓜伊拉，都以其獨特的風味和風土人情而著稱。',
    },
    {
      id: 3,
      content:
        '墨西哥，這片位於北美洲的土地，以其多變的地形和氣候而聞名，為咖啡豆的理想生長環境提供了絕佳條件。\n\n墨西哥的咖啡豆通常被稱為「阿爾圭拉」，這是一種阿拉比卡豆，以其柔和且平衡的口感而聞名。這種咖啡具有濃郁的巧克力',
    },
    {
      id: 4,
      content:
        '印尼，這片位於東南亞的咖啡寶地，擁有多個咖啡種植區域，其中蘇門答臘（Sumatra）和爪哇（Java）咖啡最為著名。\n\n蘇門答臘咖啡以其濃郁的口感和低酸度而聞名，常常帶有濃郁的巧克力和木質風味。\n\n爪哇咖啡則以其平衡的風味和豐富的口感而著稱。',
    },
    {
      id: 5,
      content:
        '衣索比亞的咖啡樹生長在高山、茂密的森林和溫暖的陽光下，為咖啡提供了獨特的風味。\n\n衣索比亞的咖啡以其多樣性而著稱，不同地區種植的咖啡豆味道各異。有些衣索比亞咖啡以花香和柔和的酸度為特點，而其他則可能帶有水果或巧克力風味。',
    },
    {
      id: 6,
      content:
        '印度，這個位於南亞的國家，也是一個令人驚嘆的咖啡種植區域。印度的咖啡樹在高山地區、茂密的森林和溫暖的陽光下茁壯成長，為咖啡帶來了獨特的風味。\n\n印度的咖啡以其多樣性而聞名，不同地區種植的咖啡豆味道各異。有些印度咖啡以濃郁的口感和低酸度而著稱，常常帶有堅果或巧克力風味。',
    },
  ]

  const fetchDataFromJson = () => {
    setSelectedData(jsonData[0]) //
  }

  useEffect(() => {
    fetchDataFromJson()
  }, [])

  const handleLocationClick = (id) => {
    // 找到有相同id的資料
    const selectedArea = jsonData.find((item) => item.id === id)

    if (selectedArea) {
      setSelectedData(selectedArea)
      // 重置所有圖標的顏色
      setIconColor1('#ef8b90')
      setIconColor2('#ef8b90')
      setIconColor3('#ef8b90')
      setIconColor4('#ef8b90')
      setIconColor5('#ef8b90')
      setIconColor6('#ef8b90')

      // 根據選定的圖標設置顏色
      if (id === 1) {
        setIconColor1('red')
      } else if (id === 2) {
        setIconColor2('red')
      } else if (id === 3) {
        setIconColor3('red')
      } else if (id === 4) {
        setIconColor4('red')
      } else if (id === 5) {
        setIconColor5('red')
      } else if (id === 6) {
        setIconColor6('red')
      }
    }
  }

  useEffect(() => {
    AOS.init({
      duration: 1000,
    })
  }, [])

  return (
    <>
      <div className="container ed-index-origin">
        <div className="origin-wrapper d-block">
          <div className="line" data-aos="fade-down" data-aos-delay="200"></div>
          <div
            className="hot-product"
            data-aos="fade-down"
            data-aos-delay="500"
          >
            咖啡與它們的產地
          </div>
          <div className="line" data-aos="fade-down" data-aos-delay="300"></div>
        </div>
      </div>
      <div className="d-flex flex-column flex-md-row my-md-5 my-3 justify-content-md-center ei-mobile-map">
        <div
          className="d-flex flex-column col-md-4"
          data-aos="fade-down"
          data-aos-delay="600"
        >
          <div className="d-flex justify-content-center">
            <img
              className="d-block ed-orgin-img"
              src="/index-image/origin.png"
              alt="COFFSEEKER"
              width={360}
              height={72}
            />
          </div>
          <h4
            className="ed-orgin-text mt-md-5 mt-3"
            dangerouslySetInnerHTML={{
              __html:
                selectedData && selectedData.content.replace(/\n/g, '<br />'),
            }}
          ></h4>
        </div>
        <div
          className="position-relative"
          data-aos="fade-down"
          data-aos-delay="900"
        >
          <Image
            className="img-fluid d-block"
            src="/index-image/world-map.svg"
            alt="instagram"
            id="instagram"
            width={1200}
            height={60}
          />
          <div className="">
            {/* //巴西 */}
            <IoLocation
              size={50}
              color={iconColor1}
              className="custom-icon"
              style={{
                marginRight: '10px',
                position: 'absolute',
                left: '29%',
                top: '56%',
              }}
              onClick={() => handleLocationClick(1)}
              stroke=""
              strokeWidth={2}
            />
            {/* //哥倫比亞 */}
            <IoLocation
              size={50}
              color={iconColor2}
              className="custom-icon"
              style={{
                marginRight: '10px',
                position: 'absolute',
                left: '23%',
                top: '46%',
              }}
              onClick={() => handleLocationClick(2)}
              stroke="blue"
              strokeWidth={2}
            />
            {/* //墨西哥 */}
            <IoLocation
              size={50}
              color={iconColor3}
              className="custom-icon"
              style={{
                marginRight: '10px',
                position: 'absolute',
                left: '15.5%',
                top: '35%',
              }}
              onClick={() => handleLocationClick(3)}
              stroke="red"
              strokeWidth={2}
            />
            {/* 印尼 */}
            <IoLocation
              size={50}
              color={iconColor4}
              className="custom-icon"
              style={{
                marginRight: '10px',
                position: 'absolute',
                left: '76%',
                top: '48%',
              }}
              onClick={() => handleLocationClick(4)}
              stroke="red"
              strokeWidth={2}
            />
            {/* 衣索比亞 */}
            <IoLocation
              size={50}
              color={iconColor5}
              className="custom-icon"
              style={{
                marginRight: '10px',
                position: 'absolute',
                left: '55%',
                top: '43%',
              }}
              onClick={() => handleLocationClick(5)}
              stroke="red"
              strokeWidth={2}
            />
            {/* 印度 */}
            <IoLocation
              size={50}
              color={iconColor6}
              className="custom-icon"
              style={{
                marginRight: '10px',
                position: 'absolute',
                left: '65.5%',
                top: '36.5%',
              }}
              onClick={() => handleLocationClick(6)}
              stroke="red"
              strokeWidth={2}
            />
          </div>
        </div>
      </div>

      {/* 手機板產地圖 */}
      <div className="d-flex flex-column flex-md-row my-md-5 my-3 justify-content-md-center d-lg-none">
        <div className="d-flex flex-column col-md-4">
          <div
            className="d-flex justify-content-center"
            data-aos="fade-down"
            data-aos-delay="300"
          >
            <img
              className="d-block ed-orgin-img"
              src="/index-image/origin.png"
              alt="COFFSEEKER"
              width={400}
              height={80}
              lazy="true"
            />
          </div>
          <h4
            className="ed-orgin-text mt-md-5 mt-3"
            data-aos="fade-down"
            data-aos-delay="600"
            dangerouslySetInnerHTML={{
              __html:
                selectedData && selectedData.content.replace(/\n/g, '<br />'),
            }}
          ></h4>
        </div>
        <div
          className="position-relative"
          data-aos="fade-down"
          data-aos-delay="300"
        >
          <Image
            className="img-fluid d-block"
            src="/index-image/world-map.svg"
            alt="instagram"
            id="instagram"
            width={1200}
            height={60}
          />
          <div className="">
            {/* //巴西 */}
            <IoLocation
              size={35}
              color={iconColor1}
              className="custom-icon"
              style={{
                // marginRight: '0px',
                position: 'absolute',
                left: '109px',
                top: '105px',
              }}
              onClick={() => handleLocationClick(1)}
              stroke="green"
              strokeWidth={2}
            />
            {/* //哥倫比亞 */}
            <IoLocation
              size={35}
              color={iconColor2}
              className="custom-icon"
              style={{
                // marginRight: '10px',
                position: 'absolute',
                left: '80px',
                top: '83px',
              }}
              onClick={() => handleLocationClick(2)}
              stroke="blue"
              strokeWidth={2}
            />
            {/* //墨西哥 */}
            <IoLocation
              size={35}
              color={iconColor3}
              className="custom-icon"
              style={{
                // marginRight: '10px',
                position: 'absolute',
                left: '50px',
                top: '55px',
              }}
              onClick={() => handleLocationClick(3)}
              stroke="red"
              strokeWidth={2}
            />
            {/* 印尼 */}
            <IoLocation
              size={35}
              color={iconColor4}
              className="custom-icon"
              style={{
                // marginRight: '10px',
                position: 'absolute',
                left: '287px',
                top: '84px',
              }}
              onClick={() => handleLocationClick(4)}
              stroke="red"
              strokeWidth={2}
            />
            {/* 衣索比亞 */}
            <IoLocation
              size={35}
              color={iconColor5}
              className="custom-icon"
              style={{
                // marginRight: '10px',
                position: 'absolute',
                left: '205px',
                top: '75px',
              }}
              onClick={() => handleLocationClick(5)}
              stroke="red"
              strokeWidth={2}
            />
            {/* 印度 */}
            <IoLocation
              size={35}
              color={iconColor6}
              className="custom-icon"
              style={{
                // marginRight: '10px',
                position: 'absolute',
                left: '247px',
                top: '58px',
              }}
              onClick={() => handleLocationClick(6)}
              stroke="red"
              strokeWidth={2}
            />
          </div>
        </div>
      </div>
    </>
  )
}
