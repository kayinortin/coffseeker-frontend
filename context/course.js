import { createContext, useContext, useState } from 'react'

const CoursesContext = createContext()

export function CoursesProvider({ children }) {
  const [coursesData, setCoursesData] = useState([])
  const [sortBy, setSortBy] = useState('default')

  return (
    <CoursesContext.Provider
      value={{ coursesData, setCoursesData, sortBy, setSortBy }}
    >
      {children}
    </CoursesContext.Provider>
  )
}
export function useCourses() {
  return useContext(CoursesContext)
}
