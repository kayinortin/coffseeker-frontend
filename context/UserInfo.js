// UserInfo.js
import React, { createContext, useContext, useState } from 'react'

const UserInfo = createContext()

export function UserProvider({ children }) {
  const [userData, setUserData] = useState(null) // 初始化用户数据为null

  return (
    <UserInfo.Provider value={{ userData, setUserData }}>
      {children}
    </UserInfo.Provider>
  )
}

export function useUser() {
  return useContext(UserInfo)
}
