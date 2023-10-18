import React from 'react'
import Link from 'next/link'

export default function Custom404() {
  return (
    <div className="ed-height ed-height--full-page">
      <div className="row justify-content-center align-items-center w-100">
        <div className="col-10 col-lg-5 d-flex flex-column justift-content-center align-items-center">
          <div className="ed-placeholder">
            <div className="ed-placeholder__img ed-placeholder__img--not-found">
              <img
                src="/bg1.png"
                alt="not-found"
                className="ed-img ed-img--contain"
              />
            </div>
            <h3 className="my-4 text-center">糟糕，找不到這個頁面耶！</h3>
            <Link
              href="/"
              role="button"
              className="ed-btn ed-btn--primary ed-btn--medium ed-btn--w100 ed-placeholder__action"
            >
              返回首頁
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
