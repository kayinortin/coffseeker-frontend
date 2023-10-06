import { useEffect } from 'react'
import axios from 'axios'

export default function NewstDataFetcher({ onDataFetched, page }) {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3005/api/news?page=${page}`
        )
        // console.log(response)
        onDataFetched(response.data)
      } catch (error) {
        console.error('資料獲取失敗:', error)
      }
    }
    fetchData()
  }, [page])
}
