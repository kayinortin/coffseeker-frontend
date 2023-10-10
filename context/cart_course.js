import { createContext, useContext, useState } from 'react'

const CartListCourseContext = createContext()

export function CartListCourseProvider({ children }) {
  const [cartListData_course, setCartListData_course] = useState([])

  return (
    <CartListCourseContext.Provider
      value={{ cartListData_course, setCartListData_course }}
    >
      {children}
    </CartListCourseContext.Provider>
  )
}

export function useCartListCourse() {
  return useContext(CartListCourseContext)
}
