import { useEffect } from 'react'
import axios from 'axios'
import { useCourses } from '@/context/course'

export default function CoursePerFetcher({ pid }) {
  const { setCoursesData } = useCourses()
  useEffect(() => {
    const FetchedPerCourse = async () => {
      // console.log(pid)
      try {
        const response = await axios.get(
          'http://localhost:3005/api/course/' + pid
        )
        // console.log(response.data)
        setCoursesData(response.data)
      } catch (err) {
        console.log('資料獲取失敗：', err)
      }
    }
    if (pid) {
      FetchedPerCourse()
    }
  }, [pid])
}
