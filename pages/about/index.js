import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import style from '../../styles/_about.module.scss'

export default function About() {
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
                    href="/about"
                    className="breadcrumb-item text-decoration-none link ms-2"
                  >
                    關於我們
                  </Link>
                </li>
              </ol>
            </nav>
          </div>

          {/* 標題區 */}
          <div className="d-flex justify-content-center align-items-center mb-4">
            <div className="ei-line me-3"></div>
            <h3 className="text-center news-title">關於我們</h3>
            <div className="ei-line ms-3"></div>
          </div>

          <div className="brand-story about-div-width d-flex md-">
            <Image
              className="me-4  mb-md-0 mobile-about-image"
              src="./about-image/coffseeker-logo.svg"
              alt="描述圖像的文字"
              width={274}
              height={166}
            />
            <div>
              <h4 className="mb-3 brand-title">品牌故事</h4>
              <p className="lh-lg">
                CoffSeeker，我們的品牌故事源於一群程式初學者對於咖啡的熱愛和探索。當初，我們在程式的世界中摸索著，就像學習一門新的語言一樣，充滿了好奇和挑戰。然而，我們發現在這個瞬息萬變的數位時代，人們常常需要片刻的寧靜和慢下來的機會。
                這種想法啟發了我們成立 CoffSeeker
                的念頭。我們想要為忙碌的人們，尋找一個回歸自我、享受細緻生活的方式。就像我們在程式碼中尋求邏輯和創意一樣，我們將這份尋求融入到咖啡的世界裡。咖啡，不僅是一種飲品，更是一種品味，一種尋找美好的旅程。
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
