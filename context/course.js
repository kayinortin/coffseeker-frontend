import { createContext, useContext, useState } from 'react'

const CoursesContext = createContext()

export function CoursesProvider({ children }) {
  const [coursesData, setCoursesData] = useState([])
  const [sortBy, setSortBy] = useState('default')
  const [selectedCourse, setSelectedCourse]=useState([])

  return (
    <CoursesContext.Provider
      value={{ coursesData, setCoursesData, sortBy, setSortBy, selectedCourse,setSelectedCourse }}
    >
      {children}
    </CoursesContext.Provider>
  )
}
export function useCourses() {
  return useContext(CoursesContext)
}
