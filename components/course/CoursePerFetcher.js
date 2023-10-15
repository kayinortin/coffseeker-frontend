import { useEffect } from 'react'
import axios from 'axios'
import { useCourses } from '@/context/course'

export default function CoursePerFetcher({ pid }) {
  const { setSelectedCourse } = useCourses()
  useEffect(() => {
    const FetchedPerCourse = async () => {
      // console.log(pid)
      try {
        const response = await axios.get(
          'http://localhost:3005/api/course/' + pid
        )
        // console.log(response.data)
        setSelectedCourse(response.data)
      } catch (err) {
        console.log('資料獲取失敗：', err)
      }
    }
    if (pid) {
      FetchedPerCourse()
    }
  }, [pid])
}
