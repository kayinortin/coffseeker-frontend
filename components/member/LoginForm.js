import React from 'react'
import Link from 'next/link'
import { FaFacebook, FaGoogle } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

export default function LoginForm() {
  const inputs = [
    {
      id: 1,
      htmlFor: 'InputEmail',
      title: '會員信箱(登入帳號)',
      placeholder: '請輸入信箱',
      type: 'email',
      htmlId: 'Inputmail',
      aria: null,
      maxlength: 50,
    },
    {
      id: 2,
      htmlFor: 'InputPassword',
      title: '密碼',
      placeholder: '請輸入密碼',
      type: 'password',
      htmlId: 'InputPassword',
      aria: null,
      maxlength: 10,
    },
  ]
  return (
    <>
      <div className={'container d-flex justify-content-center pb-3'}>
        <div className={'form-box border border-dark'}>
          <div className={'form-title border-bottom border-dark p-3'}>
            會員登入
          </div>
          <form className="p-5">
            {inputs.map((input) => {
              return (
                <div className="mb-3" key={input.id}>
                  <label htmlFor={input.htmlFor} className={'form-label'}>
                    {input.title}
                  </label>
                  <input
                    placeholder={input.placeholder}
                    type={input.tyoe}
                    className={'form-control'}
                    id={input.htmlId}
                    aria-describedby={input.aria}
                    maxLength={input.maxlength}
                  />
                  <div
                    id={'error' + input.id}
                    className={'form-text text-danger'}
                  ></div>
                </div>
              )
            })}
            <div className={'mt-4 form-check ps-0 d-flex align-items-center'}>
              <input
                type="checkbox"
                className={'check-input me-3 rounded-0'}
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
      <div className={'container d-flex justify-content-center mb-3'}>
        <div className={'ask-for-register'}>
          <span className="me-3">還不是會員嗎?</span>
          <Link href="./register" className={'ms-3'}>
            加入會員
          </Link>
        </div>
      </div>
      <div className={'container d-flex justify-content-center  pb-5'}>
        <div className={'content d-flex justify-content-between'}>
          <Link href="/" className={'forget-password'}>
            會員隱私條款
          </Link>
          <Link href="/member/forget-password" className={'forget-password'}>
            忘記密碼
          </Link>
        </div>
      </div>
    </>
  )
}
