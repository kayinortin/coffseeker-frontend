import React from 'react'
import Link from 'next/link'
import { FaFacebook, FaGoogle } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

export default function LoginForm() {
  return (
    <>
      <div className={'container d-flex justify-content-center pb-3'}>
        <div className={'login border border-dark'}>
          <div className={'form-title border-bottom border-dark p-3'}>
            會員登入
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
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                密碼
              </label>
              <input
                placeholder="請輸入密碼"
                type="password"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div className={'mb-3 form-check'}>
              <input
                type="checkbox"
                className={'form-check-input'}
                id="exampleCheck1"
              />
              <label className={'form-check-label'} htmlFor="exampleCheck1">
                記住密碼
              </label>
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
          <span>登入</span>
        </div>
      </div>
      <div
        className={
          'container d-flex justify-content-center mt-4 mb-3 align-items-center'
        }
      >
        <FaFacebook className={'h1 me-5'} />
        <FaGoogle className={'h1'} />
        <FaXTwitter className={'h1 ms-5'} />
      </div>
      <div className={'container d-flex justify-content-center'}>
        <div className={'ask-for-register mb-2'}>
          <span className="me-3">還不是會員嗎?</span>
<<<<<<< HEAD
          <Link href="./register" className={'text-secondary ms-3'}>
=======
          <Link href="./register" className={'orange-text ms-3'}>
>>>>>>> upstream/dev
            加入會員
          </Link>
        </div>
      </div>
      <div className={'container d-flex justify-content-center  pb-5'}>
        <div className={'content d-flex justify-content-between'}>
          <Link href="/" className={'forget-password'}>
            會員隱私條款
          </Link>
          <Link href="/" className={'forget-password'}>
            忘記密碼
          </Link>
        </div>
      </div>
    </>
  )
}
