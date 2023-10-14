import { createContext, useContext, useState } from 'react'

const FavContext = createContext()

export function FavProvider({ children }) {
  const [favData, setFavData] = useState([])
  const [favItemsArr, setFavItemsArr] = useState([])
  const [favCoursesArr, setFavCoursesArr] = useState([])

  return (
    <FavContext.Provider
      value={{
        favData,
        setFavData,
        favItemsArr,
        setFavItemsArr,
        favCoursesArr,
        setFavCoursesArr,
      }}
    >
      {children}
    </FavContext.Provider>
  )
}

export function useFavorite() {
  return useContext(FavContext)
}
