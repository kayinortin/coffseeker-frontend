import React from 'react'

const RemoveFavCourse = async (id) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/favorite/favorite-course/${id}`,
      {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    // 處理成功響應
    // 更新setFavItemsArr或其他狀態
  } catch (error) {
    console.error('Failed to removeFav:', error)
  }
}

export default RemoveFavCourse
