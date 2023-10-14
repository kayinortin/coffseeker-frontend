import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import style from '../../styles/_about.module.scss'
import ContactUs from '@/components/about/send-message'
import Swal from 'sweetalert2'
// import CoffeeMap from '@/components/index-coffee-map/coffee-map'

export default function About() {
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  async function handleSubmit() {
    const response = await fetch('http://localhost:3005/api/email/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, name, email }),
    })

    if (response.ok) {
      Swal.fire({
        icon: 'success',
        title: '成功！',
        text: '郵件已成功發送！',
      }).then(() => {
        setMessage('')
        setName('')
        setEmail('')
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: '錯誤！',
        text: '無法發送郵件！',
      })
    }
  }

  return (
    <>
      <section className="background">
        <div className="container">
          {/* 麵包屑 */}
          <div className="row ms-4 mt-1 mt-3">
            <nav className="nav-breadcrumb ms-3 d-none d-sm-block">
              <ol className="ei-breadcrumb m-3 list-inline">
                <li className="breadcrumb-item list-inline-item">
                  <Link href="/" className="link">
                    首頁
                  </Link>
                </li>
                <li className="breadcrumb-item list-inline-item">
                  <Link
                    href="./about"
                    className="breadcrumb-item text-decoration-none link ms-2"
                  >
                    關於我們
                  </Link>
                </li>
              </ol>
            </nav>
          </div>

          {/* 標題區 */}
          <div className="container d-block ed-index-course">
            <div className="line-white"></div>
            <div className="course-category">關於我們</div>
            <div className="line-white"></div>
          </div>

          {/* 品牌故事 */}
          <div className="brand-story about-div-width d-md-flex align-items-center">
            <Image
              className="me-4 mb-4 mb-md-0 mobile-about-image"
              src="./about-image/coffseeker-logo.svg"
              alt="描述圖像的文字"
              width={300}
              height={200}
            />
            <div>
              <h4 className="mb-3 brand-title">品牌故事</h4>
              <p className="lh-lg">
                COFFSEEKER－我們的品牌故事源於一群程式初學者對於咖啡的熱愛和探索。當初，我們在程式的世界中摸索著，就像學習一門新的語言一樣，充滿了好奇和挑戰。然而，我們發現在這個瞬息萬變的數位時代，人們常常需要片刻的寧靜和慢下來的機會。
                <br />
                這種想法啟發了我們成立COFFSEEKER的念頭。我們想要為忙碌的人們，尋找一個回歸自我、享受細緻生活的方式。就像我們在程式碼中尋求邏輯和創意一樣，我們將這份尋求融入到咖啡的世界裡。咖啡，不僅是一種飲品，更是一種品味，一種尋找美好的旅程。
              </p>
            </div>
          </div>

          {/* 我們堅持 */}
          <div className="brand-story about-div-width d-md-flex align-items-center">
            <Image
              className="me-4 mb-4 mb-md-0 mt-4 mobile-about-image align-item-center"
              src="./about-image/rating1.svg"
              alt="描述圖像的文字"
              width={274}
              height={166}
            />
            <div>
              <h4 className="mb-4 brand-title">我們堅持</h4>
              <p className="mb-3 fs-5">◆ 生豆品質</p>
              <p className="lh-lg mb-4">
                COFFSEEKER－我們的品牌故事源於一群程式初學者對於咖啡的熱愛和探索。當初，我們在程式的世界中摸索著，就像學習一門新的語言一樣，充滿了好奇和挑戰。然而，我們發現在這個瞬息萬變的數位時代，人們常常需要片刻的寧靜和慢下來的機會。
              </p>
              <p className="lh-lg mb-4">
                這種想法啟發了我們成立COFFSEEKER的念頭。我們想要為忙碌的人們，尋找一個回歸自我、享受細緻生活的方式。就像我們在程式碼中尋求邏輯和創意一樣，我們將這份尋求融入到咖啡的世界裡。咖啡，不僅是一種飲品，更是一種品味，一種尋找美好的旅程。
              </p>
              <p className="mb-3 fs-5">◆ 新鮮現烘</p>
              <p className="lh-lg mb-4">
                親手篩選每一顆咖啡生豆，並為其研發最佳烘焙曲線，堅持 「烘豆日 =
                出貨日」，將極致新鮮溫暖傳遞。
              </p>
              <p className="mb-3 fs-5">◆ 咖啡三感</p>
              <p className="lh-lg">
                每款咖啡豆，皆是經過反覆測試後細膩而生，完美平衡香、醇、酸、苦，建立質感、獨特感、驚豔感3感共構的精品咖啡。
              </p>
            </div>
          </div>

          {/* 我們提供 */}
          <div className="brand-story about-div-width d-md-flex align-items-center">
            <Image
              className="me-4 mb-4 mb-md-0 mt-4 mobile-about-image align-item-center"
              src="./about-image/coffee-package.svg"
              alt="描述圖像的文字"
              width={274}
              height={166}
            />
            <div>
              <h4 className="mb-4 brand-title">我們提供</h4>
              <p className="mb-3 fs-5">◆ 優質咖啡豆</p>
              <p className="lh-lg mb-4">
                來自世界各地的專業咖啡豆，每一顆都代表著獨特的風味和故事。我們的咖啡豆是由經驗豐富的咖啡師挑選，確保品質一流。無論您是喜歡酸甜的水果風味還是濃郁的巧克力口感，我們都有適合您口味的咖啡豆。讓您在家也能輕鬆沖泡出專業水準的咖啡，享受細緻風味的體驗。
              </p>
              <p className="mb-3 fs-5">◆ 專業咖啡器具</p>
              <p className="lh-lg mb-4">
                無論您是初學者還是想要更深入了解的愛好者，我們的課程都能夠滿足您的需求。從咖啡的起源到不同的沖泡方法，我們將用簡單易懂的方式，與您分享咖啡的知識和技巧。您將學會如何選擇咖啡豆、掌握不同的沖泡技巧，甚至可以成為家中的咖啡大師！
              </p>
              <p className="mb-3 fs-5">◆ 專業咖啡課程</p>
              <p className="lh-lg">
                選擇合適的咖啡器具對於沖泡出美味的咖啡至關重要。我們提供各種專業的咖啡器具，從傳統的手沖壺到現代的咖啡機，每一款都是由咖啡愛好者所推薦。我們將為您介紹不同器具的特點和使用方法，讓您能夠輕鬆掌握沖泡的技巧。無論您是喜歡傳統方式還是追求便捷，我們都有合適您的選擇。
              </p>
            </div>
          </div>
          <ContactUs />

          <div className="container d-sm-none">
            <div className="row mb-3">
              <label htmlFor="message" className="col-sm-2 col-form-label">
                訊息：
              </label>
              <div className="col-sm-10">
                <textarea
                  className="form-control"
                  name="message"
                  id="message"
                  rows="3"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="name" className="col-sm-2 col-form-label">
                姓名：
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="email" className="col-sm-2 col-form-label">
                Email：
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-sm-12 text-center">
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={handleSubmit}
                >
                  送出
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
