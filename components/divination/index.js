import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Swiper, SwiperSlide } from 'swiper/react'
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/autoplay'
import Lottie from 'react-lottie-player/dist/LottiePlayerLight'
import drinkCoffeeImg from '@/public/divination-image/Animation - 1695799375022.json'
import lottieJson from '@/public/map-image/logo-anime-30.json'

let cayPlay = false
export default function Divination() {
  const [gameFinish, setGameFinish] = useState(false)
  const sections = [
    {
      h2: '咖啡占卜',
      h6: `日安，迷惘的咖啡靈魂。
         <br />
         歡迎進入探索咖啡心靈的奇妙世界。
         <br />
         這裡將揭示你對咖啡的深層喜好。
         <br />
         準備好了嗎？讓我們開始你的咖啡之旅吧！`,
      svg: [],
      p: [],
    },
    {
      h2: 'Q1',
      h6: `咖啡心靈對於酸度和風味，有著怎樣的渴望？`,
      svg: ['like1', 'like2', 'like3', 'like4'],
      p: [
        '獨特風味 愛不釋手',
        '尋求恰到好處的酸度',
        '偏愛甜度 注重蜜感',
        '沒有特別偏好',
      ],
    },
    {
      h2: 'Q2',
      h6: ` 面前是咖啡之旅的十字路口，你會選擇走向哪一條指示的道路？`,
      svg: ['taste1', 'taste2', 'taste3', 'taste4'],
      p: [
        '花香果味 明亮果酸',
        '酸甜平衡 香氣溫和',
        '濃郁醇厚 唇齒繚繞 ',
        '強烈烘焙 焦糖風味',
      ],
    },
    {
      h2: 'Q3',
      h6: `伴手禮是咖啡心靈的種子，你更傾向於哪種形式？`,
      svg: ['beans1', 'beans2', 'beans3', 'beans4'],
      p: ['原形豆體', '研磨豆粉', '輕鬆濾掛', '便利即溶'],
    },
  ]
  const ans = []
  let nowSection = 0
  let picks = []
  let canSelect = false
  //卡牌動畫開始(帶入section)
  async function start(section) {
    if (cayPlay === true) {
      return false
    }

    //textArea替換
    document.querySelector(`.desk .game .textArea h2`).innerText = section.h2
    document.querySelector(`.desk .game .textArea h5`).innerText = section.h6

    document
      .querySelector(`.desk .game .textArea h2`)
      .classList.remove('scale-out-top')
    document
      .querySelector(`.desk .game .textArea h5`)
      .classList.remove('scale-out-top')

    picks = getRandomNumbers(1, 10, 4)
    cayPlay = true
    await waittings(1500)
    //動畫：展開卡片
    for (let i = 1; i <= 10; i++) {
      document
        .querySelector(`.tarotCard${i}`)
        .classList.add(`tarotCard${i}Active`)
    }
    await waittings(500)
    //動畫：pick卡片
    for (let i = 0; i < picks.length; i++) {
      document
        .querySelector(`.tarotCard${picks[i]}`)
        .classList.add(`tarotCard${picks[i]}pickup`)
      document.querySelector(
        `.tarotCard${picks[i]} .back .cardBackText`
      ).innerText = section.p[i]
      document
        .querySelector(`.tarotCard${picks[i]} .back .cardImage img`)
        .setAttribute(
          'src',
          `/divination-image/lineal-color/` + section.svg[i] + '.svg'
        )

      await waittings(300)
    }
    await waittings(300)
    //動畫：飛向指定位置
    for (let i = 0; i < 4; i++) {
      const cardSelector = document.querySelector(`.tarotCard${picks[i]}`)
      cardSelector.classList.remove(`tarotCard${picks[i]}pickup`)
      cardSelector.classList.remove(`tarotCard${picks[i]}Active`)
      cardSelector.classList.add(`forward${i + 1}`)
      // await waittings(300)
      cardSelector.classList.add(`forward${i + 1}2`)
      await waittings(300)
    }
    await waittings(300)
    //動畫：翻起卡片
    for (let i = 0; i < picks.length; i++) {
      document
        .querySelector(`.tarotCard${picks[i]} .content`)
        .classList.add('active')
      await waittings(300)
    }
    //卡片可選
    canSelect = true
    for (let i = 0; i < picks.length; i++) {
      document
        .querySelector(`.tarotCard${picks[i]} .content`)
        .classList.add('canSelect')
      document
        .querySelector(`.tarotCard${picks[i]} .canSelect`)
        .addEventListener('click', (e) => {
          handlePick(e)
        })
    }
  }
  //等等
  function waittings(time) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, time)
    })
  }
  //取得隨機數字
  function getRandomNumbers(start, end, count) {
    const numbers = Array.from({ length: end - start + 1 }, (v, i) => i + start)
    const result = []
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * numbers.length)
      result.push(numbers[randomIndex])
      numbers.splice(randomIndex, 1)
    }
    return result
  }

  //點擊按鈕事件
  async function handleStart() {
    nowSection += 1
    //動畫：文字淡出
    document
      .querySelector(`.desk .game .textArea button`)
      .classList.add('d-none')
    document
      .querySelector(`.desk .game .textArea h2`)
      .classList.add('scale-out-top')
    document
      .querySelector(`.desk .game .textArea h5`)
      .classList.add('scale-out-top')
    await waittings(500)
    start(sections[nowSection])
  }

  //點擊卡片事件
  async function handlePick(e) {
    if (canSelect === false) {
      return false
    }
    canSelect = false
    ans[nowSection - 1] = e.target.innerText
    //動畫：文字淡出
    document
      .querySelector(`.desk .game .textArea h2`)
      .classList.add('scale-out-top')
    document
      .querySelector(`.desk .game .textArea h5`)
      .classList.add('scale-out-top')
    //動畫：取消可選取樣式
    for (let i = 0; i < picks.length; i++) {
      document
        .querySelector(`.tarotCard${picks[i]} .content`)
        .classList.remove('canSelect')
    }
    //點選的卡片翻回去
    e.target.parentElement.classList.remove(`active`)
    await waittings(400)

    //動畫：卡片翻回去
    for (let i = 0; i < picks.length; i++) {
      document
        .querySelector(`.tarotCard${picks[i]} .content`)
        .classList.remove('active')
    }
    await waittings(1000)
    //動畫：卡片飛回去
    for (let i = 0; i < 4; i++) {
      const cardSelector = document.querySelector(`.tarotCard${picks[i]}`)
      cardSelector.classList.remove(`forward${i + 1}2`)
      // await waittings(300)
      cardSelector.classList.remove(`forward${i + 1}`)
      await waittings(300)
      cardSelector.classList.add(`tarotCard${picks[i]}Active`)
    }
    await waittings(300)
    //動畫：卡片摺疊回去
    for (let i = 1; i <= 10; i++) {
      document
        .querySelector(`.tarotCard${i}`)
        .classList.remove(`tarotCard${i}Active`)
    }
    //接續下個題目
    if (nowSection < 3) {
      nowSection += 1
      picks = []
      cayPlay = false
      start(sections[nowSection])
    } else {
      showResult()
    }
  }

  //生成塔羅牌
  function TarotCard({ i }) {
    return (
      <div className={`tarotCard tarotCard${i}`}>
        <div className="content">
          <div className="front"></div>
          <div className="back">
            <div className="cardBackIndex">
              <picture className="cardImage">
                <img src="" alt="" />
              </picture>
              <p className="cardBackText">卡片{i}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  //結果運算畫面
  async function showResult() {
    await waittings(500)
    setAnsArr(ans)
    setGameFinish(true)
    await waittings(1500)
    document.querySelector('.loading').classList.add('d-none')
    document.querySelector('.TarotResult').classList.remove('d-none')
  }

  //塔羅結果生成篩選條件
  const [ansArr, setAnsArr] = useState([])
  const [keyWordArr, setKeyWordArr] = useState([])

  function ansToKeyWord(ansArr) {
    const keyWordSet = new Set()
    const filterKeyWord = ['獨特', '酸', '蜜', '花香', '香氣', '厚', '焦糖']

    for (const word of filterKeyWord) {
      for (const description of ansArr) {
        if (description.includes(word)) {
          keyWordSet.add(word)
        }
      }
    }

    // 將Set轉換為陣列
    const keyWordArr = Array.from(keyWordSet)
    return keyWordArr
  }

  //推薦商品取得
  const [productData, setProductData] = useState([])
  useEffect(() => {
    if (gameFinish) {
      const word = ansToKeyWord(ansArr)
      setKeyWordArr(word)
      const keyWord = word.join()
      const fetchData = async () => {
        try {
          const res = await axios.get(
            `http://localhost:3005/api/products/qs?search=${keyWord}`
          )
          const products = res.data.data
          setProductData(products)
        } catch (error) {
          console.error('資料獲取失敗:', error)
        }
      }
      fetchData()
    }
  }, [gameFinish])

  //本體return
  if (gameFinish === false) {
    return (
      <>
        <div className="desk">
          <div className="mask"></div>
          <div className="game">
            <div className="textArea mb-auto mt-lg-5 mt-2 position-relative">
              <h2 className="scale-in-top">咖啡占卜</h2>
              <h5 className="scale-in-top">
                尋覓咖啡的靈魂
                <br />
                歡迎踏上咖啡心靈的探索之旅
                <br />
                這裡將揭示你對咖啡的深層喜好
                <br />
                準備好了嗎？
                <br className="d-lg-none" />
                讓我們開始吧！
              </h5>
              <button
                className="position-absolute top-100 start-50 translate-middle flip-in-hor-bottom"
                onClick={handleStart}
              >
                啟程
              </button>
            </div>
            <TarotCard i={1} />
            <TarotCard i={2} />
            <TarotCard i={3} />
            <TarotCard i={4} />
            <TarotCard i={5} />
            <TarotCard i={6} />
            <TarotCard i={7} />
            <TarotCard i={8} />
            <TarotCard i={9} />
            <TarotCard i={10} />
          </div>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className="loading vh-100 w-100 d-flex flex-column justify-content-center align-items-center ">
          <Lottie
            play
            loop
            style={{ width: 200, height: 200 }}
            animationData={lottieJson}
          />
          <h3 className="mt-5">探索者為您尋覓中…</h3>
        </div>
        <div className="TarotResult d-none">
          <div className="result">
            <div className="container d-flex justify-content-center">
              <div className="resultCard  d-lg-flex">
                <Lottie
                  play
                  loop
                  animationData={drinkCoffeeImg}
                  className="lottie"
                />
                <div className="title">
                  <h2>測驗結果</h2>
                  <p>
                    塔羅牌的啟示下，您的咖啡之旅顯示出您對於獨特風味的追求。
                    <br />
                    <div className="my-3">
                      <div className="">今日為您推薦的咖啡關鍵字是：</div>
                      <div className="mt-3">
                        {keyWordArr.map((v, i) => {
                          return <span key={i}>#{v}</span>
                        })}
                      </div>
                    </div>
                    祝願您的咖啡之旅充滿令人愉悅的發現和美好時刻。
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="my-5">
            <div className="container">
              <div className="swiperTitle mb-5 d-flex justify-content-center ">
                <h2>推薦商品</h2>
              </div>
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                slidesPerView={1}
                navigation
                spaceBetween={10}
                autoplay={{ delay: 3000, pauseOnMouseEnter: true }}
              >
                {productData.map((product, i) => {
                  return (
                    <SwiperSlide key={i}>
                      <div className="box">
                        <div className="ratio ratio-1x1">
                          <picture>
                            <img
                              className="ed-image-main"
                              src={`http://localhost:3005/uploads/${product.image_main}`}
                              alt={`${product.name}`}
                            />
                          </picture>
                        </div>

                        <div className="productText ms-lg-5 mt-3">
                          <div className="">
                            <h5>精選品牌 &gt; {product.brand}</h5>
                            <h4 className="ed-detail-title mb-3">
                              {product.name}
                            </h4>
                            <div className="mb-2">商品特色</div>
                            <h6 className="h5">{product.description}</h6>
                          </div>
                          <div className="">
                            <div className="mb-3 mb-lg-5 text-end">
                              <div className="mb-2 text-decoration-line-through">
                                NT${product.price}
                              </div>
                              <div className="ed-detail-price">
                                NT${product.discountPrice}
                              </div>
                            </div>
                            <div className="text-end">
                              <a
                                className="me-0 "
                                href={`/product/${product.id}`}
                                target="_blank"
                              >
                                <button className="">前往商品</button>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  )
                })}
              </Swiper>
            </div>
          </div>
        </div>
      </>
    )
  }
}
