import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import axios from 'axios'
import { GrFacebook, GrInstagram } from 'react-icons/gr'

export default function Footer() {
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const [newsData, setNewsData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/api/news`)
        if (response.data.news) {
          setNewsData(response.data.news)
        }
      } catch (error) {
        console.error('資料獲取失敗:', error)
      }
    }
    fetchData()
  }, [])
  return (
    <>
      <div className="bg-primary-color">
        {/* footer內容書寫區 */}
        <div className="container pb-5 pt-5">
          <div className="row">
            <div className="col-lg-3 col-md-2 mb-4 mb-md-0 text-center">
              <div className="d-flex flex-column align-items-center">
                {/* footer大圖 */}
                <Link
                  href="/"
                  className="d-flex flex-column justify-content-center align-items-center"
                >
                  <Image
                    src="/coffseeker-logo-footer.png"
                    alt="COFFSEEKER"
                    width={144}
                    height={144}
                    priority
                  />
                  <Image
                    src="/coffseeker-logo-inline.png"
                    alt="COFFSEEKER"
                    width={210}
                    height={42}
                  />
                </Link>
                {/* 三個外部連結 */}
                <div className="d-flex mt-3">
                  <Link
                    href="https://www.facebook.com/profile.php?id=61552119243260"
                    className="mx-3"
                  >
                    <GrFacebook
                      style={{ fontSize: '40', color: 'var(--bs-gray-700)' }}
                    />
                  </Link>
                  <a href="" className="mx-3">
                    <GrInstagram
                      style={{ fontSize: '40', color: 'var(--bs-gray-700)' }}
                    />
                  </a>
                  <a href="" className="mx-3">
                    <Image
                      src="/line-icon.svg"
                      alt="line_icon"
                      width={40}
                      height={40}
                    />
                  </a>
                </div>
              </div>
            </div>
            {/* 拉資料庫資訊後拆成component導入 */}

            <div className="col-lg-4 col-md-2 ms-md-5 ps-md-5 px-4 text-white mt-5">
              <h5 className="text-white">最新消息</h5>
              <hr />
              {newsData.slice(0, 3).map((newsItem) => (
                <div key={newsItem.news_id} className="mt-4">
                  <h6>
                    <Link
                      className="text-white"
                      href={`/news/${newsItem.news_id}`}
                    >
                      {newsItem.news_title} &gt;&gt;
                    </Link>
                  </h6>
                  <p className="footer-p-color">{newsItem.created_at}</p>
                </div>
              ))}
            </div>
            {/* 拉資料庫資訊後拆成component導入 */}
            <div className="col-lg-4 col-md-2 ms-md-5 ps-md-5 px-4 text-white mt-5">
              <h5 className="text-white">咖啡資訊</h5>
              <hr />
              <div className="mt-4">
                <h6>
                  <Link className="text-white" href="/infomation/divination">
                    尋訪內心渴望的咖啡 &gt;&gt;
                  </Link>
                </h6>
                <p className="footer-p-color">2023-10-10</p>
              </div>
              <div className="mt-4">
                <h6>
                  <Link className="text-white" href="/infomation/baked">
                    咖啡烘焙耐人尋味之處 &gt;&gt;
                  </Link>
                </h6>
                <p className="footer-p-color">2023-10-07</p>
              </div>
              <div className="mt-4">
                <h6>
                  <Link className="text-white" href="/infomation/handbrewed">
                    創造符合自己咖啡味蕾的風味 &gt;&gt;
                  </Link>
                </h6>
                <p className="footer-p-color">2023-10-06</p>
              </div>
            </div>
            <div className="col-12 col-md-10 col-lg-4 ms-lg-2 px-lg-3 px-3 mt-5 text-white">
              <p className="my-3 fw-light">© Copyright 2023 - COFFSEEKER</p>
              <p className="my-3">
                聯繫我們：
                <a href="mailto:coffseeker@gmail.com" className="text-white">
                  coffseeker@gmail.com
                </a>
              </p>
              <Link href="/about/law">
                <p className="my-3 fw-light">條款及細則</p>
              </Link>
            </div>
          </div>
          <div className="d-flex justify-content-center align-items-center mt-2">
            <button
              onClick={scrollToTop}
              className="btn btn-outline-light px-4 py-2"
            >
              TOP
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
