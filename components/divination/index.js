import React from 'react'
let cayPlay = false
export default function Divination() {
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
      h6: ` 咖啡心靈對於酸度和獨特風味，有著怎樣的渴望？？`,
      svg: ['like1', 'like2', 'like3', 'like4'],
      p: [
        '獨特風味 愛不釋手',
        '尋求恰到好處的酸度',
        '不愛酸味 繞道而行',
        '沒有特別偏好',
      ],
    },
    {
      h2: 'Q5',
      h6: ` 面前是咖啡之旅的十字路口，你會選擇走向哪一條指示的道路？`,
      svg: ['teast1', 'teast2', 'teast3', 'teast4'],
      p: [
        '獨特風味 愛不釋手',
        '尋求恰到好處的酸度',
        '不愛酸味 繞道而行',
        '沒有特別偏好',
      ],
    },
    {
      h2: 'Q6',
      h6: ` 面前是咖啡之旅的十字路口，你會選擇走向哪一條指示的道路？`,
      svg: ['teast1', 'teast2', 'teast3', 'teast4'],
      p: [
        '獨特風味 愛不釋手',
        '尋求恰到好處的酸度',
        '不愛酸味 繞道而行',
        '沒有特別偏好',
      ],
    },
  ]
  let nowSection = 0
  //卡牌動畫開始(帶入section)
  async function start(section) {
    if (cayPlay === true) {
      return false
    }
    //textArea替換
    document.querySelector(`.desk .game .textArea h2`).innerText = section.h2
    document.querySelector(`.desk .game .textArea h6`).innerText = section.h6
    let picks = getRandomNumbers(1, 10, 4)
    cayPlay = true

    //動畫：展開卡片
    for (let i = 1; i <= 10; i++) {
      document
        .querySelector(`.tarotCard${i}`)
        .classList.add(`tarotCard${i}Active`)
    }
    await waittings(1000)
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

      await waittings(1000)
    }
    await waittings(1000)
    //動畫：飛向指定位置
    for (let i = 0; i < 4; i++) {
      const cardSelector = document.querySelector(`.tarotCard${picks[i]}`)
      cardSelector.classList.remove(`tarotCard${picks[i]}pickup`)
      cardSelector.classList.remove(`tarotCard${picks[i]}Active`)
      cardSelector.classList.add(`forward${i + 1}`)
      await waittings(300)
      cardSelector.classList.add(`forward${i + 1}2`)
      await waittings(300)
    }
    await waittings(1000)
    //動畫：翻起卡片
    for (let i = 0; i < picks.length; i++) {
      document
        .querySelector(`.tarotCard${picks[i]} .content`)
        .classList.add('active')
      await waittings(1000)
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
  function handleStart() {
    nowSection += 1
    start(sections[nowSection])
  }

  //點擊卡片事件
  function handlePick() {}

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

  //本體return
  return (
    <>
      <div className="desk">
        <div className="game">
          <div className="textArea mb-auto mt-5 ">
            <h2 className="fade-in">咖啡測驗</h2>
            <h6 className="fade-in">
              日安，迷惘的咖啡靈魂。
              <br />
              歡迎進入探索咖啡心靈的奇妙世界。
              <br />
              這裡將揭示你對咖啡的深層喜好和心靈秘密。
              <br />
              準備好了嗎？讓我們開始你的咖啡之旅吧！
            </h6>
            <button className="fade-in" onClick={handleStart}>
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
}
