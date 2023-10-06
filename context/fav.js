import { createContext, useContext, useState } from 'react'

const FavContext = createContext()

export function FavProvider({ children }) {
  const [favData, setFavData] = useState([])
  const [favItemsArr, setFavItemsArr] = useState([])

  return (
    <FavContext.Provider
      value={{ favData, setFavData, favItemsArr, setFavItemsArr }}
    >
      {children}
    </FavContext.Provider>
  )
}

export function useFavorite() {
  return useContext(FavContext)
}
