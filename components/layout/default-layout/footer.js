import { grey } from '@mui/material/colors'
import React from 'react'

export default function Footer() {
  return (
    <div style={{ backgroundColor: '#1C262C' }}>
      <div className="container mt-5 pb-5 pt-5">
        <div className="row">
          <div className="col-lg-3 mb-4 mb-md-0">
            <div className="d-flex justify-content-center">
              <img src="../coffseeker-logo-footer.png" alt="" width={200} />
            </div>
            <br />
            <div style={{ color: '#ffffff' }}>
              <p style={{ fontSize: '16px' }}>© Copyright 2023 - COFFSEEKER</p>
              <p style={{ fontSize: '16px' }}>
                聯繫我們： coffseeker@gmail.com
              </p>
              <p style={{ fontSize: '16px' }}>條款及細則</p>
            </div>
          </div>
          <div className="ms-5 col-md-4" style={{ color: '#ffffff' }}>
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
          <div className="ms-5 col-md-4" style={{ color: '#ffffff' }}>
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
        </div>
      </div>
    </div>
  )
}
