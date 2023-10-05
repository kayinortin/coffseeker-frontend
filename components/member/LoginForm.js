import React, { useState, createContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { FaFacebook, FaGoogle } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useUser } from '@/context/UserInfo'
import Swal from 'sweetalert2'

export default function LoginForm() {
  const { userData, setUserData, isLoggedIn, setIsLoggedIn } = useUser()
  // 定義表單的值
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')

  const inputs = [
    {
      id: 1,
      htmlFor: 'InputEmail',
      title: '會員信箱(登入帳號)',
      placeholder: '請輸入信箱',
      type: 'email',
      htmlId: 'InputEmail',
      aria: null,
      maxlength: 50,
      onChange: (e) => setMail(e.target.value),
    },
    {
      id: 2,
      htmlFor: 'InputPassword',
      title: '密碼',
      placeholder: '請輸入密碼',
      type: 'password',
      htmlId: 'InputPassword',
      aria: null,
      maxlength: 12,
      onChange: (e) => setPassword(e.target.value),
    },
  ]
  const router = useRouter()
  // ============================
  // 在 LoginForm 元件中添加這個函式
  const handleLoginFormSubmit = async () => {
    // 建立要發送的資料物件
    const formData = {
      email: mail,
      password: password,
    }

    // Edison // 10/04 檢查代碼
    // Edison // 在這邊登入會員成功後，應該要讓isLoggedIn狀態改變
    // Edison // 這樣才能讓我的Navbar重新渲染

    // Edison // 這邊如果帳號密碼有輸入錯誤時
    // Edison // Cookies.set('userInfo', JSON.stringify(response.data.user)) 會出錯
    // Edison // 而且這樣會形成錯誤的cookie 反而會無法使用登出功能

    try {
      const response = await axios.post(
        'http://localhost:3005/api/auth-jwt/login',
        formData
      )
      console.log('伺服器回應:', response.data)

      if (response.data.code === '200' && response.data.accessToken) {
        Cookies.set('accessToken', response.data.accessToken)
        setIsLoggedIn(true)
        Swal.fire({
          title: '登入成功，即將跳轉至會員中心',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        })
      } else {
        Swal.fire({
          title: '登入失敗，請確認帳號密碼是否正確',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500,
        })
      }
    } catch (error) {
      console.error('錯誤：請確認後台API功能', error)
      setIsLoggedIn(false)
    }

    // Edison // 10/04 檢查代碼
    // Edison // 這邊如果帳號密碼有輸入錯誤時
    // Edison // Cookies.set('userInfo', JSON.stringify(response.data.user)) 會出錯
    // Edison // 用if else判斷是否登入狀態

    // 取得單一使用者資料
    try {
      const response = await axios.post(
        'http://localhost:3005/api/auth/login',
        formData
      )
      console.log('伺服器回應:', response.data)
      // setUserData(response.data.user)
      if (response.data.code === '200' && response.data.user) {
        Cookies.set('userInfo', JSON.stringify(response.data.user))
        router.push('/member')
      } else {
        Swal.fire({
          title: '登入失敗，請確認帳號密碼是否正確',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500,
        })
      }

      // const storedUserData = JSON.parse(Cookies.get('userInfo'))
      // console.log('測試抓cookie資料', storedUserData)
    } catch (error) {
      console.error('錯誤：請確認後台API功能', error)
    }
  }
  // ===================================

  return (
    <>
      <form id="loginForm" className={'form-box'}>
        <div className={'border border-dark'}>
          <div className={'form-title border-bottom border-dark p-3'}>
            會員登入
          </div>
          <div className="p-5">
            {inputs.map((input) => {
              return (
                <div className="mb-3" key={input.id}>
                  <label htmlFor={input.htmlFor} className={'form-label'}>
                    {input.title}
                  </label>
                  <input
                    placeholder={input.placeholder}
                    type={input.type}
                    className={'form-control'}
                    id={input.htmlId}
                    aria-describedby={input.aria}
                    maxLength={input.maxlength}
                    onChange={(e) => {
                      input.onChange(e)
                    }}
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
          </div>
        </div>
        <div className={'d-flex justify-content-center mt-4'}>
          <button
            className={'btn-login border-0 text-center'}
            type="button"
            onClick={handleLoginFormSubmit}
          >
            登入
          </button>
        </div>
        <div
          className={
            'container d-flex justify-content-center mt-4 mb-3 align-items-center'
          }
        >
          <FaFacebook className={'h2 me-5'} />
          <FaGoogle className={'h2'} />
          <FaXTwitter className={'h2 ms-5'} />
        </div>
        <div className={'d-flex justify-content-center mb-3'}>
          <div className={'ask-for-register'}>
            <span className="me-3">還不是會員嗎?</span>
            <Link href="./register" className={'ms-3'}>
              加入會員
            </Link>
          </div>
        </div>

        <div className={'d-flex justify-content-between'}>
          <Link href="/" className={'forget-password'}>
            會員隱私條款
          </Link>
          <Link href="/member/forget-password" className={'forget-password'}>
            忘記密碼
          </Link>
        </div>
      </form>
    </>
  )
}
