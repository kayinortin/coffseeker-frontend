import React from 'react'
import Link from 'next/link'
export default function ForgetPassword() {
  return (
    <>
      <div className={'container d-flex justify-content-center pb-3'}>
        <div className={'login border border-dark'}>
          <div className={'form-title border-bottom border-dark p-3'}>
            忘記密碼
          </div>
          <form className="p-5">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                會員信箱(登入帳號)
              </label>
              <input
                placeholder="請輸入信箱"
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text"></div>
            </div>
          </form>
        </div>
      </div>
      <div className={'container d-flex justify-content-center'}>
        <div
          className={
            'btn-login text-center d-flex justify-content-center flex-column'
          }
        >
          <span>送出驗證信</span>
        </div>
      </div>

      <div
        className={
          'container d-flex justify-content-between content p-0 align-items-center ask-for-login'
        }
      >
        {/* <div className={'my-3'}></div> */}
        <div className={'ask-for-regester my-3'}>
          <span className="me-3">已經是會員了?</span>
          <Link href="./register" className={'text-secondary ms-3'}>
            會員登入
          </Link>
        </div>
        <div className={'ask-for-regester my-3'}>
          <span className="me-3">還不是會員嗎?</span>
          <Link href="./register" className={'text-secondary ms-3'}>
            加入會員
          </Link>
        </div>
      </div>
    </>
  )
}
