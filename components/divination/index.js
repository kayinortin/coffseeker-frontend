import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { register } from 'swiper/element/bundle'
import Lottie from 'react-lottie-player/dist/LottiePlayerLight'
import drinkCoffeeImg from '@/public/divination-image/Animation - 1695799375022.json'
let cayPlay = false
register()
export default function Divination() {
  const [gameFinish, setGameFinish] = useState(false)
  const sections = [
    {
      h2: '咖啡測驗',
      h6: `日安，迷惘的咖啡靈魂。
         <br />
         歡迎進入探索咖啡心靈的奇妙世界。
         <br />
         這裡將揭示你對咖啡的深層喜好和心靈秘密。
         <br />
         準備好了嗎？讓我們開始你的咖啡之旅吧！`,
      svg: [],
      p: [],
    },
    {
      h2: 'Q1',
      h6: `在咖啡的世界中，你更傾向於從哪個角落尋找一杯心靈的滋養？`,
      svg: ['shop1', 'shop2', 'shop3', 'shop4'],
      p: ['自營咖啡坊', '高級連鎖咖啡廳', '平價連鎖咖啡廳', '便利商店'],
    },
    {
      h2: 'Q2',
      h6: `咖啡與甜點共譜的和諧交響曲中，你會選擇哪份甜蜜伴奏？`,
      svg: ['cake1', 'cake2', 'cake3', 'cake4'],
      p: [
        '輕盈無負擔 戚風蛋糕',
        '均衡營養 堅果塔',
        '濃郁奶香 起司蛋糕',
        '不太喜歡甜點',
      ],
    },
    {
      h2: 'Q3',
      h6: `咖啡靈魂的渴望在你耳邊低語，訴說它傾向於何種風味？`,
      svg: ['faver1', 'faver2', 'faver3', 'faver4'],
      p: [
        '經典濃郁 純正香氣',
        '輕微獨特 不失平衡',
        '充滿驚喜 風味特殊',
        '沒有特別偏好',
      ],
    },
    {
      h2: 'Q4',
      h6: `咖啡心靈對於酸度和獨特風味，有著怎樣的渴望？`,
      svg: ['like1', 'like2', 'like3', 'like4'],
      p: [
        '獨特風味 愛不釋手',
        '尋求恰到好處的酸度',
        '偏愛甜度 注重蜜感',
        '沒有特別偏好',
      ],
    },
    {
      h2: 'Q5',
      h6: ` 面前是咖啡之旅的十字路口，你會選擇走向哪一條指示的道路？`,
      svg: ['teast1', 'teast2', 'teast3', 'teast4'],
      p: [
        '花香果味 明亮果酸',
        '酸甜平衡 香氣溫和',
        '濃郁醇厚 唇齒繚繞 ',
        '強烈烘焙 焦糖風味',
      ],
    },
    {
      h2: 'Q6',
      h6: `旅程即將結束，伴手禮是咖啡心靈的種子，你更傾向於哪種形式？`,
      svg: ['beans1', 'beans2', 'beans3', 'beans4'],
      p: ['純粹原豆', '研磨豆粉', '輕鬆濾掛', '便利即溶'],
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
    document
      .querySelector(`.desk .game .textArea h2`)
      .classList.remove('blur-out-expand')
    document
      .querySelector(`.desk .game .textArea h5`)
      .classList.remove('blur-out-expand')
    //textArea替換
    document.querySelector(`.desk .game .textArea h2`).innerText = section.h2
    document.querySelector(`.desk .game .textArea h5`).innerText = section.h6

    picks = getRandomNumbers(1, 10, 4)
    cayPlay = true
    await waittings(1000)
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
        .setAttribute('src', '/divination-image/' + section.svg[i] + '.svg')

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
      .classList.add('blur-out-expand')
    document
      .querySelector(`.desk .game .textArea h5`)
      .classList.add('blur-out-expand')
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
    console.log(ans)
    //動畫：文字淡出
    document
      .querySelector(`.desk .game .textArea h2`)
      .classList.add('blur-out-expand')
    document
      .querySelector(`.desk .game .textArea h5`)
      .classList.add('blur-out-expand')
    //動畫：取消可選取樣式
    for (let i = 0; i < picks.length; i++) {
      document
        .querySelector(`.tarotCard${picks[i]} .content`)
        .classList.remove('canSelect')
    }
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
    await waittings(500)
    //接續下個題目
    if (nowSection < 6) {
      nowSection += 1
      picks = []
      cayPlay = false
      start(sections[nowSection])
      await waittings(500)
    } else {
      setAnsArr(ans)
      setGameFinish(true)
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

  //塔羅結果生成篩選條件
  const [ansArr, setAnsArr] = useState(null)
  function ansToKeyWord(ansArr) {
    const keyWordArr = []
    console.log('ansArr:' + ansArr)
    const filterKeyWord = [
      '蛋糕',
      '堅果',
      '經典',
      '平衡',
      '驚喜',
      '特殊',
      '獨特',
      '酸',
      '蜜',
      '花香',
      '香氣',
      '厚',
      '焦糖',
    ]

    for (const word of filterKeyWord) {
      for (const description of ansArr) {
        if (description.includes(word)) {
          keyWordArr.push(word)
        }
      }
    }
    return keyWordArr
  }
  //推薦商品取得
  const [productData, setProductData] = useState(null)
  const [fetchProductDataEnd, setFetchProductDataEnd] = useState(false)
  useEffect(() => {
    if (gameFinish) {
      const keyWordArr = ansToKeyWord(ansArr)
      const keyWord = keyWordArr.join()
      console.log('keyWord:' + keyWord)
      const fetchData = async () => {
        try {
          const res = await axios.get(
            `http://localhost:3005/api/products/qs?search=${keyWord}`
          )
          const products = res.data.data
          setProductData(products)
          setFetchProductDataEnd(true)
        } catch (error) {
          console.error('資料獲取失敗:', error)
        }
      }
      fetchData()
    }
  }, [gameFinish])

  //生成推薦商品swiper分頁

  function SwiperPages(productData) {
    if (fetchProductDataEnd) {
      return (
        <>
          {productData.productData.map((product, i) => (
            <swiper-slide key={i}>
              <div className="box">
                <div className="ratio ratio-1x1">
                  <picture>
                    <img src="/divination-image/desk2.png" alt="" />
                  </picture>
                </div>

                <div className="productText ms-5">
                  <div className="">
                    <h4 className="mb-3">{product.name}</h4>
                    <h5>{product.description}</h5>
                  </div>
                  <div className="">
                    <h4>NT{product.discountPrice}</h4>
                  </div>
                </div>
              </div>
            </swiper-slide>
          ))}
        </>
      )
    }
  }
  //本體return
  if (gameFinish === false) {
    return (
      <>
        <div className="desk">
          <div className="mask"></div>
          <div className="game">
            <div className="textArea mb-auto mt-5 ">
              <h2 className="focus-in-contract">咖啡測驗</h2>
              <h5 className="focus-in-contract">
                日安，迷惘的咖啡靈魂。
                <br />
                歡迎進入探索咖啡心靈的奇妙世界。
                <br />
                這裡將揭示你對咖啡的深層喜好和心靈秘密。
                <br />
                準備好了嗎？讓我們開始你的咖啡之旅吧！
              </h5>
              <button className="" onClick={handleStart}>
                開始
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
        <div className="TarotResult">
          <section className="result">
            <div className="container d-flex justify-content-center">
              <div className="resultCard d-lg-flex">
                <Lottie
                  play
                  loop
                  style={{ width: 600, height: 600 }}
                  animationData={drinkCoffeeImg}
                  className="lottie"
                />
                <div className="title">
                  <h2>測驗結果</h2>
                  <p>
                    當塔羅牌的啟示下，您的咖啡之旅顯示出您對於獨特風味的追求。
                    <br />
                    您的味蕾是一個多彩的舞台，總是上演著糕點之舞。
                    <br />
                    而在咖啡的星空下，您像是一位星座探險家，時刻尋求著新的星座。
                    <br />
                    您偏好的咖啡口味是花香果味和特殊風味，這反映了您對於生活中多樣性和驚喜的熱愛。
                    <br />
                    無論形式如何，您對於咖啡的熱情總是源源不斷。祝願您的咖啡之旅充滿令人愉悅的發現和美好時刻。
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="my-5">
            <div className="container">
              <div className="swiperTitle mb-5 d-flex justify-content-center ">
                <h2>推薦商品</h2>
              </div>
              <swiper-container
                //左右控制
                navigation="true"
                //分頁點點
                pagination="false"
                //進度條
                scrollbar="false"
                //每頁幾張
                slides-per-view="1"
                speed="500"
                loop="false"
                css-mode="true"
              >
                <SwiperPages productData={productData} />
              </swiper-container>
            </div>
          </section>
        </div>
      </>
    )
  }
}
