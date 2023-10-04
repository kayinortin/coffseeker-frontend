import { createContext, useContext, useState } from 'react'

const ProductsContext = createContext()

export function ProductsProvider({ children }) {
  const [productsData, setProductsData] = useState([])

  return (
    <ProductsContext.Provider value={{ productsData, setProductsData }}>
      {children}
    </ProductsContext.Provider>
  )
}
export function useProducts() {
  return useContext(ProductsContext)
}
