import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import style from '../../styles/_about.module.scss'
import ContactUs from '@/components/about/send-message'
import Swal from 'sweetalert2'
import Head from 'next/head'

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
        iconColor: '#b54b33', //success
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
        iconColor: '#1C262C', 
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
                  <div>
                    <Head>
                      <title>關於我們｜探索咖啡COFFSEEKER</title>
                    </Head>
                  </div>
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
          <div className="d-flex justify-content-center mb-4 align-items-center mobile-news-title">
            <div className="ei-line me-3"></div>
            <h3 className="text-center news-title fs-2">關於我們</h3>
            <div className="ei-line ms-3"></div>
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
                COFFSEEKER的故事源自對寧靜的渴望，在這個資訊爆炸的時代，我們常常渴望一個片刻的寧靜，一個機會，讓自己慢下來，重新連結內在。這正是COFFSEEKER的初衷。
                <br />
                <br />
                受到這個理念啟發，我們創立了COFFSEEKER。我們的目標是為那些忙碌的人們提供一個回歸自我的機會，一個細緻生活的方式。在COFFSEEKER，咖啡不僅僅是一種飲品，它是一種慢慢的享受，一種與自己連結的方式。
                <br />
                <br />
                我們的咖啡豆來自世界各地，每一杯都承載著特殊的風味和故事。我們致力於為您提供最優質的咖啡，同時提供專業的咖啡課程，協助您更深入地了解咖啡的世界。這不僅僅是一個咖啡品味之旅，更是一場回歸自我的探險。
                <br />
                <br />
                在COFFSEEKER，我們相信咖啡是生活中的小確幸，它能讓您放慢腳步，品味生活的美好。歡迎您參與我們的網站，探索這個細緻生活的方式，並與我們一同享受每一杯咖啡的瞬間。
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
              <br />
              <p className="mb-3 fs-5">◆ 生豆品質</p>
              <p className="lh-lg mb-4">
                我們的咖啡豆來自世界各地，每一個產地都有其獨特的風土和氣候，這些因素共同塑造了咖啡豆的風味。我們與精選的咖啡農場建立了合作關係，這些農場以熱情和專業致力於種植高品質的咖啡豆。我們的採購團隊精心挑選每一批咖啡豆，確保它們滿足我們的品質標準。
              </p>
              <br />
              <p className="mb-3 fs-5">◆ 新鮮現烘</p>
              <p className="lh-lg mb-4">
                親手篩選每一顆咖啡生豆，並為其研發最佳烘焙曲線，堅持 「烘豆日 =
                出貨日」，將極致新鮮溫暖傳遞。
              </p>
              <br />
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
              <br />
              <p className="mb-3 fs-5">◆ 優質咖啡豆</p>
              <p className="lh-lg mb-4">
                來自世界各地的專業咖啡豆，每一顆都代表著獨特的風味和故事。我們的咖啡豆是由經驗豐富的咖啡師挑選，確保品質一流。無論您是喜歡酸甜的水果風味還是濃郁的巧克力口感，我們都有適合您口味的咖啡豆。讓您在家也能輕鬆沖泡出專業水準的咖啡，享受細緻風味的體驗。
              </p>
              {/* <p className="mb-3 fs-5">◆ 專業咖啡器具</p>
              <p className="lh-lg mb-4">
                無論您是初學者還是想要更深入了解的愛好者，我們的課程都能夠滿足您的需求。從咖啡的起源到不同的沖泡方法，我們將用簡單易懂的方式，與您分享咖啡的知識和技巧。您將學會如何選擇咖啡豆、掌握不同的沖泡技巧，甚至可以成為家中的咖啡大師！
              </p> */}{' '}
              <br />
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
