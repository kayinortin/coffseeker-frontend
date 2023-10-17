import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const ShowContext = createContext()

export function DetailProvider({ children }) {
  const [show, setShow] = useState({
    in: false,
    out: false,
    selectedPid: null,
  })

  const router = useRouter()

  // Function to close all modals
  const closeAllModals = () => {
    setShow({
      in: false,
      out: false,
      selectedPid: null,
    })
  }

  useEffect(() => {
    // Handler to close modals when the browser back button is pressed
    const handlePopState = () => {
      closeAllModals()
    }

    // Attach the event listener for browser back button
    window.addEventListener('popstate', handlePopState)

    // Handler to close modals when route changes
    const handleRouteChange = () => {
      closeAllModals()
    }

    // Attach the event listener for route change
    router.events.on('routeChangeStart', handleRouteChange)

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('popstate', handlePopState)
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [])

  return (
    <ShowContext.Provider value={{ show, setShow }}>
      {children}
    </ShowContext.Provider>
  )
}

// Custom hook to provide show context
export function useShow() {
  return useContext(ShowContext)
}
