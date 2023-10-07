import React, { createContext, useContext, useState } from 'react'

const CommentContent = createContext()

export function CommentProvider({ children }) {
  const [comments, setComments] = useState([])
  return (
    <CommentContent.Provider value={{ comments, setComments }}>
      {children}
    </CommentContent.Provider>
  )
}

export function useComment() {
  return useContext(CommentContent)
}
