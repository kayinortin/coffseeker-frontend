import { useEffect } from 'react'
import axios from 'axios'

export default function CoursePerFetcher({ pid, onCoursePerFetched }) {
  useEffect(() => {
    const FetchedPerCourse = async () => {
      console.log(pid)
      try {
        const response = await axios.get(
          'http://localhost:3005/api/course/' + pid
        )

        onCoursePerFetched(response.data)
      } catch (err) {
        console.log('資料獲取失敗：', err)
      }
    }
    if (pid) {
      FetchedPerCourse()
    }
  }, [pid])
}
