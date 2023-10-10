import { createContext, useContext, useState } from 'react'

const CartList2Context = createContext()

export function CartList2Provider({ children }) {
  const [cartList2Data, setCartList2Data] = useState([])

  return (
    <CartList2Context.Provider value={{ cartList2Data, setCartList2Data }}>
      {children}
    </CartList2Context.Provider>
  )
}

export function useCartList() {
  return useContext(CartList2Context)
}
