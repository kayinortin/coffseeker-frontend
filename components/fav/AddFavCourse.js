import React from 'react'

const AddFavCourse = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:3005/api/favorite/favorite-course`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          course_id: id,
        }),
      }
    )
    // 處理成功響應
    // 更新setFavItemsArr或其他狀態
  } catch (error) {
    console.error('Failed to addFav:', error)
  }
}

export default AddFavCourse
