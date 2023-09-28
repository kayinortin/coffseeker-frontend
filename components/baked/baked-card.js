import React, { useState } from 'react'

function BakedCard() {
  const [selectedCard, setSelectedCard] = useState(null)

  const handleCardClick = (index) => {
    setSelectedCard(index)
  }

  const cardContents = [
    {
      title: '● 淺烘焙（Light）',
      content:
        '淺烘焙常見於單一產地咖啡豆烘焙，此種烘焙舊稱為肉桂烘焙，因為其烘焙出的咖啡帶有肉桂皮的顏色，此烘焙出的咖啡具有高酸度和低濃度，有些並具有果實般的甜味，因烘焙較淺一般來說咖啡豆飽和感是比較低的，如果加上牛奶的話，咖啡味道會很容易被蓋掉，就不合適，但是如果是花香、果香或果酸味比較明顯的淺焙咖啡，這三種味道在加入牛奶後，還是會保留這些明顯的味道，例如：蘋果味明顯的淺焙咖啡，加上牛奶喝起來就會有蘋果牛奶的味道。這類的淺焙咖啡通常來說就比較適合加入牛奶。',
      image: '/baked/Light-roast-coffee-beans.webp',
    },
    {
      title: '● 中烘焙（Medium）',
      content:
        '中烘焙介於淺烘焙與中深烘焙之間。這種烘焙通常會帶有平衡的風味，不像淺烘焙那麼酸，也不像深烘焙那麼苦。咖啡豆的色澤較淺，並且還未出現太多的油脂。這種風味適合喜歡中等強度咖啡的人。',
      image: '/baked/Medium-roast-coffee-beans.webp',
    },
    {
      title: '● 中深烘焙（Medium Dark）',
      content:
        '中深烘焙介於中烘焙與深烘焙之間，有時被稱為維也納式（Viennese）烘焙。這種烘焙會帶有深棕色斑點，外觀已經可以看到油脂，又稱作淺法式烘焙（Light French）。這種烘焙的咖啡豆風味較重，但仍保留一些酸度。這是適合喜歡風味豐富咖啡的人的選擇。',
      image: '/baked/Medium-Dark-roast-coffee-beans.webp',
    },
    {
      title: '● 深烘焙（Dark）',
      content:
        '深烘焙是咖啡豆的最深程度烘焙，通常呈現深黑色，並泛出油光，苦味濃烈，常見分為法式烘焙（French Roast），帶有苦巧克力的色澤。義式烘焙（Italian）則幾乎呈現黑色的外觀並且咖啡豆表面非常油。這種烘焙適合喜歡濃烈、苦味的咖啡風味的人，常見於連鎖體系咖啡店或適合牛奶量多的拿鐵咖啡。',
      image: '/baked/Dark-roast-coffee-beans.webp',
    },
  ]

  const getSelectedCardContent = () => {
    if (selectedCard !== null) {
      return (
        <div className="selected-card-content  col-lg-9 col-10 lh-base fs-5 container ">
          <h4 className="selected-card-heading mb-4">
            {cardContents[selectedCard].title}
          </h4>
          <p className="mb-4">{cardContents[selectedCard].content}</p>
        </div>
      )
    }
    return null
  }

  return (
    <>
      <div className="ei-baked-container d-flex  justify-content-center ">
        {/* 標題區 */}
        <div className="d-flex justify-content-center my-4 align-items-center mobile-news-title">
          <div className="ei-line me-3"></div>
          <h3 className="text-center news-title">烘焙介紹</h3>
          <div className="ei-line ms-3"></div>
        </div>
        <div className="card-grid row  d-flex flex-wrap ms-2">
          {cardContents.map((card, index) => (
            <a
              key={index}
              className={`ei-baked-card ${
                selectedCard === index ? 'active' : ''
              } col-lg-6 col-md-6 col-sm-1`}
              href="#"
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
            </a>
          ))}
        </div>

        {/* 顯示選擇的卡片內容 */}
        <div className="row d-flex justify-content-center">
          <div className="baked-card-content me-0">
            {getSelectedCardContent()}
          </div>
        </div>
      </div>
    </>
  )
}

export default BakedCard
