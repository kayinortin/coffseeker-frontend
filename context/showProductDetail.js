import { createContext, useContext, useState } from 'react'

const ShowContext = createContext()

export function DetailProvider({ children }) {
  const [show, setShow] = useState({
    in: false,
    out: false,
    selectedPid: null,
  })
  return (
    <ShowContext.Provider value={{ show, setShow }}>
      {children}
    </ShowContext.Provider>
  )
}

export function useShow() {
  return useContext(ShowContext)
}
