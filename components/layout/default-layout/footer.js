import React from 'react'
import Image from 'next/image'
import { GrFacebook, GrInstagram } from 'react-icons/gr'

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth', // 使用平滑滚动
  })
}

export default function Footer() {
  return (
    <div className="bg-primary-color">
      <div className="container pb-5 pt-5" style={{ maxWidth: '1600px' }}>
        <div className="row">
          <div className="col-lg-3 col-md-2 mb-4 mb-md-0 text-center">
            <div className="d-flex flex-column align-items-center">
              <a href="http://localhost:3000" className="d-block">
                <Image
                  src="http://localhost:3000/coffseeker-logo-footer.png"
                  alt="COFFSEEKER"
                  width={312.5}
                  height={184.5}
                  priority
                />
                <Image
                  src="http://localhost:3000/coffseeker-logo-inline.png"
                  alt="COFFSEEKER"
                  width={210}
                  height={42}
                />
              </a>
              <div className="d-flex mt-3">
                <a href="" className="mx-3">
                  <GrFacebook
                    style={{ fontSize: '40', color: 'var(--bs-gray-700)' }}
                  />
                </a>
                <a href="" className="mx-3">
                  <GrInstagram
                    style={{ fontSize: '40', color: 'var(--bs-gray-700)' }}
                  />
                </a>
                <a href="" className="mx-3">
                  <Image
                    src="http://localhost:3000/line-icon.svg"
                    alt="line_icon"
                    width={40}
                    height={40}
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-2 ms-md-5 ps-md-5 px-4 text-white mt-5">
            <h5 className="text-white">最新消息</h5>
            <hr />
            <div className="mt-2">
              <h6>
                <a className="text-white" href="./news">
                  暖心8月－探索咖啡之旅 &gt;&gt;
                </a>
              </h6>
              <p className="footer-p-color">Jul 31, 2023</p>
            </div>
            <div className="mt-4">
              <h6>
                <a className="text-white" href="./news">
                  暖心8月－探索咖啡之旅 &gt;&gt;
                </a>
              </h6>
              <p className="footer-p-color">Jul 31, 2023</p>
            </div>
            <div className="mt-4">
              <h6>
                <a className="text-white" href="./news">
                  暖心8月－探索咖啡之旅 &gt;&gt;
                </a>
              </h6>
              <p className="footer-p-color">Jul 31, 2023</p>
            </div>
          </div>
          <div className="col-lg-4 col-md-2 ms-md-5 ps-md-5 px-4 text-white mt-5">
            <h5 className="text-white">咖啡資訊</h5>
            <hr />
            <div className="mt-2">
              <h6>
                <a className="text-white" href="./news">
                  暖心8月－探索咖啡之旅 &gt;&gt;
                </a>
              </h6>
              <p className="footer-p-color">Jul 31, 2023</p>
            </div>
            <div className="mt-4">
              <h6>
                <a className="text-white" href="./news">
                  暖心8月－探索咖啡之旅 &gt;&gt;
                </a>
              </h6>
              <p className="footer-p-color">Jul 31, 2023</p>
            </div>
            <div className="mt-4">
              <h6>
                <a className="text-white" href="./news">
                  暖心8月－探索咖啡之旅 &gt;&gt;
                </a>
              </h6>
              <p className="footer-p-color">Jul 31, 2023</p>
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
            <p className="my-3 fw-light">條款及細則</p>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center mt-4">
          <button
            onClick={scrollToTop}
            className="btn btn-outline-light px-4 py-2"
          >
            TOP
          </button>
        </div>
      </div>
    </div>
  )
}
