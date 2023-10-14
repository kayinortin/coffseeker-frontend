import React, { useState, createContext, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import useFirebase from '@/hooks/use-firebase'
import { useAuth } from '@/context/useAuth'
import axios from 'axios'
import Cookies from 'js-cookie'
import Swal from 'sweetalert2'
import { useUser } from '@/context/UserInfo'
export default function Google() {
  const router = useRouter()
  const { setIsLoggedIn } = useUser()
  const { loginGoogleRedirect, initApp } = useFirebase()
  const { auth, setAuth } = useAuth()
  useEffect(() => {
    initApp(callbackGoogleLoginRedirect)
  }, [])
  const callbackGoogleLoginRedirect = async (providerData) => {
    // 如果目前react(next)已經登入中，不需要再作登入動作
    if (auth.isAuth) return
    console.log(providerData)

    const res = await axios.post(
      'http://localhost:3005/api/google-login/jwt',
      providerData,
      {
        withCredentials: true, // 注意: 必要的，儲存 cookie 在瀏覽器中
      }
    )

    if (res.data.message === 'success') {
      setAuth({
        isAuth: true,
        userData: res.data.user,
      })
      Cookies.set('accessToken', res.data.accessToken)
      setIsLoggedIn(true)
      console.log('res.data', res.data)
      Swal.fire({
        title: '登入成功，即將跳轉至會員中心',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
      })
      router.push('https://localhost:9000/member')
    } else {
      alert('有錯誤')
    }
  }
}
