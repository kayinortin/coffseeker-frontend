import { grey } from '@mui/material/colors'
import React from 'react'

export default function Footer() {
  return (
    <div style={{ backgroundColor: '#1C262C' }}>
      <div className="container pb-5 pt-5">
        <div className="row">
          <div className="col-lg-3 mb-4 mb-md-0">
            <div className="d-flex justify-content-center">
              <a href="/">
                <img src="../coffseeker-logo-footer.png" alt="" width={200} />
              </a>
            </div>
            <br />
            <div className="ms-md-5 ps-5 d-none" style={{ color: '#ffffff' }}>
              <p style={{ fontSize: '16px' }}>© Copyright 2023 - COFFSEEKER</p>
              <p style={{ fontSize: '16px' }}>
                聯繫我們： coffseeker@gmail.com
              </p>
              <p style={{ fontSize: '16px' }}>條款及細則</p>
            </div>
          </div>
          <div className="ms-md-5 col-md-4 ps-5" style={{ color: '#ffffff' }}>
            <p>最新消息</p>
            <hr></hr>
            <div>
              <h6>暖心8月－探索咖啡之旅 &gt;&gt;</h6>
              <p style={{ fontSize: '16px', color: 'grey' }}>Jul 31, 2023</p>
            </div>
            <div>
              <h6>暖心8月－探索咖啡之旅 &gt;&gt;</h6>
              <p style={{ fontSize: '16px', color: 'grey' }}>Jul 31, 2023</p>
            </div>
            <div>
              <h6>暖心8月－探索咖啡之旅 &gt;&gt;</h6>
              <p style={{ fontSize: '16px', color: 'grey' }}>Jul 31, 2023</p>
            </div>
          </div>
          <div className="ms-md-5 col-md-4 ps-5" style={{ color: '#ffffff' }}>
            <p>咖啡資訊</p>
            <hr></hr>
            <div>
              <h6>暖心8月－探索咖啡之旅 &gt;&gt;</h6>
              <p style={{ fontSize: '16px', color: 'grey' }}>Jul 31, 2023</p>
            </div>
            <div>
              <h6>暖心8月－探索咖啡之旅 &gt;&gt;</h6>
              <p style={{ fontSize: '16px', color: 'grey' }}>Jul 31, 2023</p>
            </div>
            <div>
              <h6>暖心8月－探索咖啡之旅 &gt;&gt;</h6>
              <p style={{ fontSize: '16px', color: 'grey' }}>Jul 31, 2023</p>
            </div>
          </div>
          <div className="ms-md-5 ps-5 mt-5" style={{ color: '#ffffff' }}>
            <p style={{ fontSize: '14px' }}>© Copyright 2023 - COFFSEEKER</p>
            <p style={{ fontSize: '14px' }}>管理者登入</p>
            <p style={{ fontSize: '14px' }}>聯繫我們： coffseeker@gmail.com</p>
            <p style={{ fontSize: '14px' }}>條款及細則</p>
          </div>
        </div>
      </div>
    </div>
  )
}
