import { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import useInterval from '@/hooks/useInterval'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export default function ForgetPassword() {
  const [email, setEmail] = useState('')
  const [token, setToken] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [message, setMessage] = useState('')
  const [count, setCount] = useState(10)
  const [delay, setDelay] = useState(null)
  // 判斷使用者如果成功透過按鈕取得OTP切換顯示的表單
  const [gotOTP, setGotOTP] = useState(false)

  // 簡易Swal函式
  const successSwal = (successMsg) => {
    Swal.fire({
      title: successMsg,
      icon: 'success',
      iconColor: '#b54b33', //success
      showConfirmButton: false,
      timer: 1500,
    })
  }
  const errorSwal = (errorMsg) => {
    Swal.fire({
      title: errorMsg,
      icon: 'error',
      iconColor: '#1c262c', //error
      showConfirmButton: false,
      timer: 1500,
    })
  }

  const router = useRouter()

  useInterval(() => {
    setCount(count - 1)
  }, delay)

  useEffect(() => {
    if (count <= 0) {
      setDelay(null)
    }
  }, [count])

  // Edison // 1004 代碼檢查
  // Edison // 這邊寄送驗證碼之後不會跳出修改密碼的區塊

  const getOtp = async () => {
    if (delay !== null) {
      setMessage('60s　內無法重新獲得驗證碼')
      Swal.fire({
        title: '60s　內無法重新獲得驗證碼',
        icon: 'error',
        iconColor: '#1c262c', //error
        showConfirmButton: false,
        timer: 1500,
      })
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
      Swal.fire({
        title: '驗證碼取得失敗，請確認Email是否已經註冊',
        icon: 'error',
        iconColor: '#1c262c', //error
        showConfirmButton: false,
        timer: 1500,
      })
    }

    if (res.data.message === 'email sent') {
      setMessage('驗證碼已寄送到你填寫的Email信箱中')
      Swal.fire({
        title: '驗證碼已寄送到你填寫的Email信箱中',
        icon: 'success',
        iconColor: '#b54b33', //success
        showConfirmButton: false,
        timer: 1500,
      })
      setCount(60)
      setDelay(1000)
      setGotOTP(true)
      // 應該也要設定在這 setGotOTP(true)
    }
  }

  const resetPassword = async () => {
    const passwordRegex = /^(?=.*[a-zA-Z]).{8,12}$/
    if (password === '') {
      errorSwal('密碼不能為空')
      return false
    } else if (!passwordRegex.test(password)) {
      errorSwal('密碼格式不符 請輸入8~12位,英數混合的密碼')
      return false
    } else if (rePassword !== password) {
      errorSwal('密碼不相符')
      return false
    }

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
      successSwal('密碼已成功修改！')
      router.push('/member/login')
    } else {
      setMessage('密碼修改失敗！')
      errorSwal('驗證碼錯誤')
    }
    console.log(res.data)
  }

  return gotOTP !== true ? (
    <>
      <div className={'form-box'}>
        <div className={'border border-dark'}>
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
            <h5>
              <FontAwesomeIcon
                icon="fa-solid fa-spinner"
                spin
                style={{ color: '#7d3131' }}
              />
            </h5>
          </form>
        </div>
        <div className={'mt-4'}>
          <button className={'btn-login text-center border-0'} onClick={getOtp}>
            {delay ? count + '秒後可以再次取得驗證碼' : '取得驗證碼'}
          </button>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className={'form-box'}>
        <div className={'border border-dark'}>
          <div className={'form-title border-bottom border-dark p-3'}>
            重設密碼
          </div>
          <form className={'p-5'}>
            <button
              className={
                'btn-getOTP text-center allow-btn mb-3 border-0 text-center px-3'
              }
              type="button"
              onClick={getOtp}
            >
              {delay ? count + '秒後可以再次取得驗證碼' : '取得驗證碼'}
            </button>
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
                type="password"
                className={'form-control'}
                value={password}
                placeholder="請輸入8~12位數,英數混和的密碼"
                id="newPassword"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div id="emailHelp" className="form-text"></div>
            </div>
            <div className={'mb-3'}>
              <label htmlFor="newPassword" className={'form-label'}>
                確認密碼：
              </label>
              <input
                type="password"
                className={'form-control'}
                value={rePassword}
                placeholder="請輸入相同的密碼"
                id="newPassword"
                onChange={(e) => setRePassword(e.target.value)}
              />
              <div id="emailHelp" className="form-text">
                <h5>{message}</h5>
              </div>
            </div>
          </form>
        </div>
        <div className={'mt-4'}>
          <button
            className={'btn-login text-center border-0'}
            onClick={resetPassword}
          >
            重設密碼
          </button>
        </div>
      </div>
    </>
  )
}
