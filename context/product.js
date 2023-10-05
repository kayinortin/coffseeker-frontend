import { createContext, useContext, useState } from 'react'

const ProductsContext = createContext()

export function ProductsProvider({ children }) {
  const [productsData, setProductsData] = useState([])
  const [sortBy, setSortBy] = useState('default')

  return (
    <ProductsContext.Provider
      value={{ productsData, setProductsData, sortBy, setSortBy }}
    >
      {children}
    </ProductsContext.Provider>
  )
}
export function useProducts() {
  return useContext(ProductsContext)
}
