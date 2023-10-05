import React, { createContext, useContext, useState } from 'react'

export const CartContext = createContext()

export const useCart = () => {
  return useContext(CartContext)
}

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]) //購物車列表

  const addToCart = (product) => {
    setCart([...cart, product])
  }

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  )
}
