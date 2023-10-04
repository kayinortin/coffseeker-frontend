import { createContext, useContext, useState } from 'react'

const CategoryContext = createContext()

export function CategoryProvider({ children }) {
  const [categoryData, setCategoryData] = useState([])

  return (
    <CategoryContext.Provider value={{ categoryData, setCategoryData }}>
      {children}
    </CategoryContext.Provider>
  )
}

export function useCategory() {
  return useContext(CategoryContext)
}
