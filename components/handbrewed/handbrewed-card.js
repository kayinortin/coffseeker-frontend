import React, { useState } from 'react'
import Image from 'next/image'

function HandBrewedCard() {
  const [selectedCard, setSelectedCard] = useState(null)

  const handleCardClick = (index) => {
    setSelectedCard(index)
  }

  const cardContents = [
    {
      title: '手沖是什麼',
      content:
        '手沖咖啡是一種滴濾式咖啡，沖泡方式是把熱水倒在咖啡粉上，藉由濾紙、濾杯萃取出咖啡液，這種方式的萃取速度較快，比起常見平價的即溶咖啡、機器沖煮的義式咖啡，更能品嘗到咖啡豆原有的風味。手沖咖啡沖煮過程約3~4分鐘就能完成，透過控制沖煮水溫、水流速度、方向、咖啡豆研磨粗細度等細節，能創造出不同層次的手沖咖啡風味，是十分講求技巧與咖啡專業知識的沖煮法。',
      image: '/handbrewed-image/1.jpg',
    },
    {
      title: '四大迷人特點',
      content:
        '早晨手沖一杯咖啡，既可享受到咖啡香，許多人也隨著享受咖啡，開啟對咖啡更深入的認識，像是咖啡的來源、風味、萃取方式等知識，提高對咖啡的認識和品味，以下就分享4個手沖咖啡的迷人之處！\n\n萃取有效率：手沖咖啡加速了咖啡萃取的效率，搭配濾紙能過濾出更多的雜質，讓我們喝到乾淨順口的咖啡。過程有趣性：手沖咖啡沖煮的過程比較緩慢，可以享受到沖煮咖啡的樂趣，讓喝咖啡成為一種放鬆的生活體驗。\n\n風味多樣化：每種咖啡豆都有專屬風味，並且烘焙程度也能帶出多層次的變化，像是淺焙的咖啡可能帶有花果、草本香，而中焙則能品嚐到厚實的烤花生、巧克力風味。\n\n美味個人化：咖啡風味會受到多種因素的影響，包含咖啡豆品質、咖啡粉的粗細、手沖的水溫速度，每個人創造出的風味都不太一樣，享受獨有風格的咖啡。',
      image: '/handbrewed-image/2.png',
    },
    {
      title: '',
      content:
        '中深烘焙介於中烘焙與深烘焙之間，有時被稱為維也納式（Viennese）烘焙。這種烘焙會帶有深棕色斑點，外觀已經可以看到油脂，又稱作淺法式烘焙（Light French）。這種烘焙的咖啡豆風味較重，但仍保留一些酸度。這是適合喜歡風味豐富咖啡的人的選擇。',
      image: '',
    },
    {
      title: '',
      content:
        '深烘焙是咖啡豆的最深程度烘焙，通常呈現深黑色，並泛出油光，苦味濃烈，常見分為法式烘焙（French Roast），帶有苦巧克力的色澤。義式烘焙（Italian）則幾乎呈現黑色的外觀並且咖啡豆表面非常油。這種烘焙適合喜歡濃烈、苦味的咖啡風味的人，常見於連鎖體系咖啡店或適合牛奶量多的拿鐵咖啡。',
      image: '',
    },
  ]

  // 在返回中使用dangerouslySetInnerHTML呈現換行字符
  const getSelectedCardContent = () => {
    if (selectedCard !== null) {
      const contentWithLineBreaks = cardContents[selectedCard].content
        .split('\n')
        .map((paragraph, index) => <p key={index}>{paragraph}</p>)

      return (
        <div className="ei-selected-card-content col-lg-9 col-10 lh-base fs-5 container ">
          <div className="d-flex align-items-center">
            <Image
              src="/season/wrap6.png"
              alt=""
              width={50}
              height={50}
              className="mb-4 me-3"
            />
            <h4 className="selected-card-heading ml-2">
              {cardContents[selectedCard].title}
            </h4>
          </div>
          {contentWithLineBreaks}
        </div>
      )
    }
    return null
  }

  return (
    <>
      <div className="ei-baked-container d-flex justify-content-center">
        {/* 標題區 */}
        <div className="d-flex justify-content-center my-4 align-items-center mobile-news-title">
          <div className="ei-line me-3"></div>
          <h3 className="text-center news-title fs-2">手沖介紹</h3>
          <div className="ei-line ms-3"></div>
        </div>
        <div className="  d-flex flex-wrap  mt-3">
          {cardContents.map((card, index) => (
            <div
              key={index}
              className={`ei-baked-card ${
                selectedCard === index ? 'active' : ''
              } col-lg-6 col-md-6 col-12 mb-3 me-lg-4`}
              onClick={() => handleCardClick(index)}
            >
              <div
                className="baked-background"
                style={{
                  backgroundImage: `url(${card.image})`,
                }}
              ></div>
              <div className="ei-content">
                <h6 className="baked-heading fs-5">{card.title}</h6>
              </div>
            </div>
          ))}
        </div>

        {/* 顯示選擇的卡片內容 */}
        <div className="row d-flex justify-content-center">
          <div className="baked-card-content mt-md-0">
            {getSelectedCardContent()}
          </div>
        </div>
      </div>
    </>
  )
}

export default HandBrewedCard
