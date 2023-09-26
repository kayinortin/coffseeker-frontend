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
      <div className={'container d-flex justify-content-center pb-3'}>
        <div className={'form-box border border-dark'}>
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
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
              />
              <div id="emailHelp" className="form-text"></div>
            </div>
            <h5>{message}</h5>
          </form>
        </div>
      </div>
      <div className={'container d-flex justify-content-center'}>
        <button
          className={
            'btn-login text-center allow-btn mb-3 border-0 text-center'
          }
          onClick={getOtp}
        >
          {delay ? count + '秒後可以再次取得驗證碼' : '取得驗證碼'}
        </button>
      </div>
      <div className="container d-flex justify-content-center mb-3">
        <div className={'form-box border border-dark'}>
          <div className={'form-title border-bottom border-dark p-3'}>
            重設密碼
          </div>
          <form className={'p-5'}>
            <div className={'mb-3'}>
              <label htmlFor="OTPcode" className={'form-label'}>
                電子郵件驗證碼：
              </label>
              <input
                type="text"
                className={'form-control'}
                value={token}
                placeholder="請輸入您在信箱取得的驗證碼"
                id="OTPcode"
                onChange={(e) => setToken(e.target.value)}
              />
            </div>
            <div className={'mb-3'}>
              <label htmlFor="newPassword" className={'form-label'}>
                新密碼：
              </label>
              <input
                type="text"
                className={'form-control'}
                value={password}
                placeholder="請輸入8~12位數,英數混和的密碼"
                id="newPassword"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </form>
        </div>
      </div>
      <div className={'container d-flex justify-content-center'}>
        <button
          className={'btn-login text-center allow-btn mb-3 border-0'}
          onClick={resetPassword}
        >
          重設密碼
        </button>
      </div>
      <div
        className={
          'container d-flex justify-content-between p-0 align-items-center ask-for-login'
        }
      >
        <div className={'ask-for-regester my-3'}>
          <span className="me-3">已經是會員了?</span>
          <Link href="./login" className={'orange-text ms-3'}>
            會員登入
          </Link>
        </div>
        <div className={'ask-for-regester my-3'}>
          <span className="me-3">還不是會員嗎?</span>
          <Link href="./register" className={'orange-text ms-3'}>
            加入會員
          </Link>
        </div>
      </div>
    </>
  )
}
