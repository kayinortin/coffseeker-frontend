import React, { useState, useEffect } from 'react'
import { useFavorite } from '@/context/fav'
export default async function FetchFavProductId() {
  const { favItemsArr, setFavItemsArr } = useFavorite()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://localhost:3005/api/favorite/my-favorite-product',
          {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        const data = await response.json()
        const Arr = data.favoriteProducts
        if (Arr) {
          setFavItemsArr(Arr)
        }
      } catch (error) {
        console.error('Failed to fetch favorite products:', error)
      }
    }
    fetchData()
  }, [])

  return null // or you can return a loading indicator here
}
