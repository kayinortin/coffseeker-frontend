// UserInfo.js
import React, { createContext, useContext, useState } from 'react'

const UserInfo = createContext()

export function UserProvider({ children }) {
  const [userData, setUserData] = useState(null) // 初始化用户数据为null
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <UserInfo.Provider
      value={{ userData, setUserData, isLoggedIn, setIsLoggedIn }}
    >
      {children}
    </UserInfo.Provider>
  )
}

export function useUser() {
  return useContext(UserInfo)
}
