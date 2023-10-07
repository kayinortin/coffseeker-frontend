import React, { createContext, useContext, useState } from 'react'

const PaginationContext = createContext()

export function PaginationProvider({ children }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  return (
    <PaginationContext.Provider
      value={{ currentPage, setCurrentPage, totalPages, setTotalPages }}
    >
      {children}
    </PaginationContext.Provider>
  )
}

export function usePagination() {
  return useContext(PaginationContext)
}
