import { useEffect, useState } from 'react'
import axios from 'axios'

export default function UsersDataFetcher({ onDataFetched }) {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3005/api/users')
        // console.log(response.data)
        onDataFetched(response.data)
      } catch (error) {
        console.error('資料獲取失敗:', error)
      }
    }
    fetchData()
  }, [])
}
