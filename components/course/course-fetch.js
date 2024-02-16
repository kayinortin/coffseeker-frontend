import { useEffect } from 'react'
import axios from 'axios'
import { useCourses } from '@/context/course'

export default function CourseFetcher() {
  const { coursesData, setCoursesData } = useCourses()

  useEffect(() => {
    const FetchedCourse = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/course`
        )

        const courses = response.data.courses

        setCoursesData(courses)
        // console.log('資料獲取成功：', courses)
      } catch (error) {
        console.log('資料獲取失敗：', error)
      }
    }
    FetchedCourse()
  }, [])

  return null
}
