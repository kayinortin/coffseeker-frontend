import { useEffect, useState } from 'react'
import axios from 'axios'

export default function PopularProducts({ onDataFetched }) {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3005/api/popular-products'
        )
        console.log(response.data)
        // const top8PopularProducts = response.data.slice(0, 8)
        onDataFetched(response.data)
      } catch (error) {
        console.error('資料獲取失敗:', error)
      }
    }
    fetchData()
  }, [])
}
