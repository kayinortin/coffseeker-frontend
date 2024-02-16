import { useEffect, useState } from 'react'
import axios from 'axios'

export default function UsersDataFetcher({ onDataFetched }) {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users`
        )
        // console.log(response.data)
        onDataFetched(response.data)
      } catch (error) {
        console.error('資料獲取失敗:', error)
      }
    }
    fetchData()
  }, [])
}
