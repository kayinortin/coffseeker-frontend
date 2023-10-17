import React, { useState, createContext, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { FaFacebook, FaGoogle, FaEyeSlash, FaEye } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useUser } from '@/context/UserInfo'
import Swal from 'sweetalert2'
import contenOfContract from '@/data/member/contract.json'
import useFirebase from '@/hooks/use-firebase'
import { useAuthJWT } from '@/context/useAuthJWT'

// 10/10 尚未完成
// 1.記住密碼
// 2.密碼顯示切換
// 3.拆分component

export default function LoginForm() {
  const { userData, setUserData, isLoggedIn, setIsLoggedIn } = useUser()
  // 定義表單的值
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')
  const [checkPassword, setCheckPassword] = useState(false)

  const handleKeyDown = (event, index) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      const nextIndex = index + 1
      if (nextIndex < inputs.length) {
        inputs[nextIndex].ref.current.focus()
      }
    }
  }

  const handleFormSubmit = (e) => {
    if (e.key === 'Enter') {
      handleLoginFormSubmit()
    }
  }

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
      ref: useRef(),
      onChange: (e) => setMail(e.target.value),
      onKeyDown: (e) => handleKeyDown(e, 0),
    },
    {
      id: 2,
      htmlFor: 'InputPassword',
      title: '密碼',
      placeholder: '請輸入密碼',
      type: checkPassword ? 'text' : 'password',
      htmlId: 'InputPassword',
      aria: null,
      maxlength: 12,
      ref: useRef(),
      onChange: (e) => setPassword(e.target.value),
      onKeyDown: handleFormSubmit,
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

    try {
      const response = await axios.post(
        'http://localhost:3005/api/auth-jwt/login',
        formData
      )
      // console.log('伺服器回應:', response.data)

      if (response.data.code === '200' && response.data.accessToken) {
        Cookies.set('accessToken', response.data.accessToken)
        setIsLoggedIn(true)
        Swal.fire({
          title: '登入成功，即將跳轉至會員中心',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        })
        router.push('/member')
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

    // 取得單一使用者資料
    try {
      const response = await axios.post(
        'http://localhost:3005/api/auth-jwt/login',
        formData
      )
      // console.log('伺服器回應:', response.data)
      // setUserData(response.data.user)
      if (response.data.code === '200' && response.data.user) {
        // Cookies.set('userInfo', JSON.stringify(response.data.user))
        setUserData(response.data.user)
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

  const openContract = () => {
    Swal.fire({
      title: `使用者隱私合約`,
      html: `<div class="border border-dark contract">${contenOfContract.contract}</div>`,
      confirmButtonText: '了解',
      customClass: {
        popup: 'contract-popup', // 自定義彈窗的類別
      },
    })
  }

  // ===================================

  // // google登入相關

  const { loginGoogleRedirect, initApp, logoutFirebase } = useFirebase()
  const { authJWT, setAuthJWT } = useAuthJWT()

  useEffect(() => {
    initApp(callbackGoogleLoginRedirect)
    console.log(authJWT)
  }, [authJWT])

  const callbackGoogleLoginRedirect = async (providerData) => {
    if (authJWT.isAuth) return

    const res = await axios.post(
      'http://localhost:3005/api/google-login/jwt',
      providerData,
      {
        withCredentials: true,
      }
    )
    console.log(res.data)
    if (res.data.message === 'success') {
      setAuthJWT({
        isAuth: true,
        userData: res.data.user,
      })

      Cookies.set('accessToken', res.data.accessToken)
      setIsLoggedIn(true)

      Swal.fire({
        title: '登入成功，即將跳轉至會員中心',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
      })
      router.push('/member')
    } else {
      alert('有錯誤')
    }
  }

  const logout = async () => {
    logoutFirebase()

    // 伺服器logout
    const res = await axios.post(
      'http://localhost:3005/api/auth-jwt/logout',
      {},
      {
        withCredentials: true, // save cookie in browser
      }
    )

    if (res.data.message === 'success') {
      localStorage.removeItem('hasVisitedBefore')
      Swal.fire({
        title: '登出成功',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
      })
      setAuthJWT({
        isAuth: false,
        userData: {
          id: 0,
          name: '',
          username: '',
          r_date: '',
        },
      })
    }
  }

  return (
    <>
      <form id="loginForm" className={'form-box'}>
        <div className={'border border-dark'}>
          <div className={'form-title border-bottom border-dark p-3'}>
            會員登入
          </div>
          <div className="p-5">
            {inputs.map((input, index) => {
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
                    ref={input.ref}
                    onChange={(e) => {
                      input.onChange(e)
                    }}
                    onKeyDown={(e) => {
                      input.onKeyDown(e)
                    }}
                  />
                  <div
                    id={'error' + input.id}
                    className={'form-text text-danger'}
                  ></div>
                </div>
              )
            })}
            <div className={'d-flex justify-content-end position-relative'}>
              <button
                className={'position-absolute eyes h5'}
                type="button"
                onClick={() => {
                  checkPassword
                    ? setCheckPassword(false)
                    : setCheckPassword(true)
                }}
              >
                {checkPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
            {/* <div className={'form-check ps-0 d-flex align-items-center'}>
              <input
                type="checkbox"
                className={'check-input me-3 rounded-0'}
                id="exampleCheck1"
              />
              <label className={'form-check-label'} htmlFor="exampleCheck1">
                記住密碼
              </label>
            </div> */}
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
          <button
            className={'border-0 bg-none third-login me-5'}
            type="button"
            onClick={() => {
              console.log('test')
            }}
          >
            <FaFacebook className={'h2'} />
          </button>
          <button
            className={'border-0 bg-none third-login'}
            type="button"
            onClick={loginGoogleRedirect}
          >
            <FaGoogle className={'h2'} />
          </button>
          <button
            className={'border-0 bg-none third-login ms-5'}
            type="button"
            onClick={logout}
          >
            <FaXTwitter className={'h2'} />
          </button>
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
          <button
            className={'forget-password border-0 bg-none'}
            type="button"
            onClick={openContract}
          >
            會員隱私條款
          </button>
          <Link href="/member/forget-password" className={'forget-password'}>
            忘記密碼
          </Link>
        </div>
      </form>
    </>
  )
}
