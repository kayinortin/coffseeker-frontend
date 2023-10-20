import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useMediaQuery } from 'react-responsive'
import { Swiper, SwiperSlide } from 'swiper/react'
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from 'swiper/modules'
import FavIcon from '../FavIcon'
import { useCartList } from '@/context/cart'
import useAddCart from '@/hooks/useAddCart'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/autoplay'
import CourseTopHitsCard from './CourseTopHitsCard'

const TopHitsMobile = (props) => {
  const [data, setData] = useState([])
  const { addCart } = useAddCart(props.product)
  useEffect(() => {
    const FetchedCourse = async () => {
      try {
        const response = await axios.get('http://localhost:3005/api/course')

        const courses = response.data.courses

        if (courses.length !== 0) {
          setData(courses)
        }
      } catch (error) {
        console.log('資料獲取失敗：', error)
      }
    }
    FetchedCourse()
  }, [])

  const slicedData = data.slice(10, 19)

  const isDesktop = useMediaQuery({ query: '(min-width: 768px)' })

  const handleShow = (e) => {
    if (!isDesktop) {
      e.preventDefault()
    }
  }

  return (
    <>
      <h5 className="mt-4">相關商品</h5>
      <div className="my-4">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={25}
          slidesPerView={1}
          navigation
          autoplay={{ delay: 3000 }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
        >
          {slicedData.map((course, i) => {
            return (
              <SwiperSlide key={i}>
                <CourseTopHitsCard key={course.id} course={course} />
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </>
  )
}

export default TopHitsMobile
