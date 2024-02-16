import React, { useState, useContext, createContext, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

const AuthContextJWT = createContext(null)

export const AuthProviderJWT = ({ children }) => {
  const [authJWT, setAuthJWT] = useState({
    isAuth: false,
    userData: {
      id: 0,
      name: '',
      email: '',
      username: '',
      r_date: '',
    },
  })

  const router = useRouter()

  // 登入頁路由
  const loginRoute = '/facebook'
  // 隱私頁面路由，未登入時會，檢查後跳轉至登入頁
  const protectedRoutes = ['/facebook/login-status-jwt']

  // 檢查會員認証用
  const checkAuth = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth-jwt/check-login`,
      {
        withCredentials: true,
      }
    )

    if (res.data.message === 'authorized') {
      setAuthJWT({ isAuth: true, userData: res.data.user })
    }
    // 可以在這裡實作跳轉
    else {
      if (protectedRoutes.includes(router.pathname)) {
        router.push(loginRoute)
      }
    }
  }

  // didMount(初次渲染)後，向伺服器要求檢查會員是否登入中
  useEffect(() => {
    if (router.isReady && !authJWT.isAuth) {
      checkAuth()
    }
    // 下面加入router.pathname，是為了要在向伺服器檢查後，
    // 如果有比對到是隱私路由，就執行跳轉到登入頁面工作
    // 注意有可能會造成向伺服器要求多次，此為簡單的實作範例
    // eslint-disable-next-line
  }, [router.isReady, router.pathname])

  return (
    <AuthContextJWT.Provider
      value={{
        authJWT,
        setAuthJWT,
        // favorites,
        // setFavorites,
      }}
    >
      {children}
    </AuthContextJWT.Provider>
  )
}

export const useAuthJWT = () => useContext(AuthContextJWT)
