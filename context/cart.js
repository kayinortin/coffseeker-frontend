import { createContext, useContext, useState } from 'react'

const CartListContext = createContext()

export function CartListProvider({ children }) {
  const [cartListData, setCartListData] = useState([])

  return (
    <CartListContext.Provider value={{ cartListData, setCartListData }}>
      {children}
    </CartListContext.Provider>
  )
}

export function useCartList() {
  return useContext(CartListContext)
}
