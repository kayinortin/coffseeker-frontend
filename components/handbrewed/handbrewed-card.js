import React from 'react'

const HandBrewCard = () => {
  return (
    <div className=" ei-hand-container ">
      <div className="ei-hand-card-border mx-4">
        <div className="ei-hand-card">
          <div className="ei-hand-content">
            <h2 className="ei-hand-title">手沖是什麼?</h2>
            <p className="ei-hand-text">
              手沖咖啡是一種「滴濾式咖啡」，沖泡方式是把熱水倒在咖啡粉上，藉由濾紙、濾杯萃取出咖啡液，這種方式的萃取速度較快，比起常見平價的即溶咖啡、機器沖煮的義式咖啡，更能品嘗到咖啡豆原有的風味。
              手沖咖啡沖煮過程約3~4分鐘就能完成，透過控制沖煮水溫、水流速度、方向、咖啡豆研磨粗細度等細節，能創造出不同層次的手沖咖啡風味，是十分講求技巧與咖啡專業知識的沖煮法。
            </p>
          </div>
        </div>
      </div>

      <div className="ei-hand-card-border mx-4">
        <div className="ei-hand-card">
          <div className="ei-hand-content">
            <h2 className="ei-hand-title">手沖的迷人之處</h2>
            <div className="ei-hand-text">
              <li>
                萃取有效率：手沖咖啡加速了咖啡萃取的效率，搭配濾紙能過濾出更多的雜質，讓我們喝到乾淨順口的咖啡。
              </li>
              <br />
              <li>
                過程有趣性：手沖咖啡沖煮的過程比較緩慢，可以享受到沖煮咖啡的樂趣，讓喝咖啡成為一種放鬆的生活體驗。
              </li>
              <br />
              <li>
                風味多樣化：每種咖啡豆都有專屬風味，並且烘焙程度也能帶出多層次的變化，像是淺焙的咖啡可能帶有花果、草本香，而中焙則能品嚐到厚實的烤花生、巧克力風味。
              </li>
              <br />
              <li>
                美味個人化：咖啡風味會受到多種因素的影響，包含咖啡豆品質、咖啡粉的粗細、手沖的水溫速度，每個人創造出的風味都不太一樣，享受獨有風格的咖啡。
              </li>
            </div>
          </div>
        </div>
      </div>

      <div className="ei-hand-card-border mx-4">
        <div className="ei-hand-card">
          <div className="ei-hand-content">
            <h2 className="ei-hand-title">Home of middle-earth</h2>
            <p className="ei-hand-text">
              Ever since the first The Lord of the Rings movie was released in
              2001, New Zealand has been known as the 'Home of Middle‑earth™'
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HandBrewCard
