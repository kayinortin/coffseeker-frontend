import { createContext, useContext, useState } from 'react'

const CoursesContext = createContext()

export function CoursesProvider({ children }) {
  const [CoursesData, setCoursesData] = useState([])
  const [sortBy, setSortBy] = useState('default')

  return (
    <CoursesContext.Provider
      value={{ CoursesData, setCoursesData, sortBy, setSortBy }}
    >
      {children}
    </CoursesContext.Provider>
  )
}
export function useCourses() {
  return useContext(CoursesContext)
}
