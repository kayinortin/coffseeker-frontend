<<<<<<< HEAD
import React from 'react'
import Link from 'next/link'
export default function ForgetPassword() {
  return (
    <>
=======
import { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import useInterval from '@/hooks/use-interval'

export default function ForgetPassword() {
  const [email, setEmail] = useState('')
  const [token, setToken] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [count, setCount] = useState(10)
  const [delay, setDelay] = useState(null)

  useInterval(() => {
    setCount(count - 1)
  }, delay)

  useEffect(() => {
    if (count <= 0) {
      setDelay(null)
    }
  }, [count])

  const getOtp = async () => {
    if (delay !== null) {
      setMessage('60s　內無法重新獲得驗證碼')
      return
    }

    const res = await axios.post(
      'http://localhost:3005/api/reset-password/otp',
      {
        email,
      }
    )

    console.log(res.data)
    if (res.data.message === 'fail') {
      setMessage('驗證碼取得失敗，請確認Email是否已經註冊')
    }

    if (res.data.message === 'email sent') {
      setMessage('驗證碼已寄送到你填寫的Email信箱中')
      setCount(60)
      setDelay(1000)
    }
  }

  const resetPassword = async () => {
    const res = await axios.post(
      'http://localhost:3005/api/reset-password/reset',
      {
        email,
        token,
        password,
      }
    )

    if (res.data.message === 'success') {
      setMessage('密碼已成功修改！')
    } else {
      setMessage('密碼修改失敗！')
    }
    console.log(res.data)
  }

  return (
    <>
      <div>本頁面已經串好OTP by Edison</div>
>>>>>>> upstream/dev
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
<<<<<<< HEAD
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text"></div>
            </div>
=======
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
              />
              <div id="emailHelp" className="form-text"></div>
            </div>
            <h5>{message}</h5>
>>>>>>> upstream/dev
          </form>
        </div>
      </div>
      <div className={'container d-flex justify-content-center'}>
        <div
          className={
            'btn-login text-center d-flex justify-content-center flex-column'
          }
        >
<<<<<<< HEAD
          <span>送出驗證信</span>
        </div>
      </div>

=======
          <button onClick={getOtp}>
            {delay ? count + '秒後可以再次取得驗證碼' : '取得驗證碼'}
          </button>
        </div>
      </div>
      <div className="container">
        <label>
          電子郵件驗證碼：
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
        </label>
        <br />
        <label>
          新密碼：
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button onClick={resetPassword}>重設密碼</button>
      </div>
>>>>>>> upstream/dev
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
