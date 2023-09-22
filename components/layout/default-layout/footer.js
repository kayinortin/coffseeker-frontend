import React from 'react'

export default function Footer() {
  return (
    <div className="bg-primary-color">
      <div className="container pb-5 pt-5">
        <div className="row">
          <div className="col-lg-3 col-md-2 mb-4 mb-md-0">
            <div className="d-flex justify-content-center">
              <a href="http://localhost:3000">
                <img src="../coffseeker-logo-footer.png" alt="" width={200} />
              </a>
            </div>
            <br />
            <div className="ms-md-5 ps-5 d-none text-white">
              <p>© Copyright 2023 - COFFSEEKER</p>
              <p>聯繫我們： coffseeker@gmail.com</p>
              <p>條款及細則</p>
            </div>
          </div>
          <div className="col-lg-4 col-md-2 ms-lg-4 ms-md-2 ps-5 text-white">
            <h5 className="text-white">最新消息</h5>
            <hr></hr>
            <div className="mt-2">
              <h6 className="text-white">暖心8月－探索咖啡之旅 &gt;&gt;</h6>
              <p className="footer-p-color">Jul 31, 2023</p>
            </div>
            <div className="mt-4">
              <h6 className="text-white">暖心8月－探索咖啡之旅 &gt;&gt;</h6>
              <p className="footer-p-color">Jul 31, 2023</p>
            </div>
            <div className="mt-4">
              <h6 className="text-white">暖心8月－探索咖啡之旅 &gt;&gt;</h6>
              <p className="footer-p-color">Jul 31, 2023</p>
            </div>
          </div>
          <div className="col-lg-4 col-md-2 ms-md-5 ps-5 text-white">
            <h5 className="text-white">咖啡資訊</h5>
            <hr></hr>
            <div className="mt-2">
              <h6 className="text-white">暖心8月－探索咖啡之旅 &gt;&gt;</h6>
              <p className="footer-p-color">Jul 31, 2023</p>
            </div>
            <div className="mt-4">
              <h6 className="text-white">暖心8月－探索咖啡之旅 &gt;&gt;</h6>
              <p className="footer-p-color">Jul 31, 2023</p>
            </div>
            <div className="mt-4">
              <h6 className="text-white">暖心8月－探索咖啡之旅 &gt;&gt;</h6>
              <p className="footer-p-color">Jul 31, 2023</p>
            </div>
          </div>
          <div className="col-6 col-md-11 ms-md-5 ps-5 mt-5 text-white">
            <p>© Copyright 2023 - COFFSEEKER</p>
            <p>聯繫我們： coffseeker@gmail.com</p>
            <p>條款及細則</p>
          </div>
        </div>
      </div>
    </div>
  )
}
