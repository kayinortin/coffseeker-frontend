import React, { useState, useEffect } from 'react'
import { useFavorite } from '@/context/fav'
export default async function FetchFavCourseId() {
  const { favCoursesArr, setFavCoursesArr } = useFavorite()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://localhost:3005/api/favorite/my-favorite-course',
          {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        const data = await response.json()
        const Arr = data.favoriteCourses
        if (Arr) {
          setFavCoursesArr(Arr)
        }
      } catch (error) {
        console.error('Failed to fetch favorite courses:', error)
      }
    }
    fetchData()
  }, [])

  return null // or you can return a loading indicator here
}
