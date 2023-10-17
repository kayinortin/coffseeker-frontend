import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
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



const TopHitsMobile = (props) => {
  const [data, setData]=useState([])
  const { addCart } = useAddCart(props.product)
  useEffect(() => {
    const FetchedCourse = async () => {
      try {
        const response = await axios.get('http://localhost:3005/api/course')

        const courses = response.data.courses

        if(courses.length!==0){
          setData(courses)
        }
        
        
      } catch (error) {
        console.log('資料獲取失敗：', error)
      }
    }
    FetchedCourse()
  }, [])

  
  

  
  const slicedData=data.slice(10,19)
  
  

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
              <SwiperSlide key={i}><div className="card ed-border-none">
                  <Link
                    className="ed-border-card01"
                    href={`/course/${course.id}`}
                    onClick={handleShow}
                  >
                    <img
                      src={`http://localhost:3000/${course.course_image}`}
                      alt={course.course_name}
                      className="card-img-top"
                    />
                  </Link>
                  <FavIcon size="medium" type="icon" id={course.id} />
                  <div className="card-body ed-card-body">
                    {/* <p className="ed-card-brand">精選品牌 &gt; {brand}</p> */}
                    <h5 className="card-title ed-card-title">{course.course_name}</h5>
                    <h6 className="card-title ed-card-description">
                      {course.course_description}
                    </h6>
                    <div className="d-flex justify-content-between align-items-center">
                      <h6 className="ed-card-price">NT${course.course_price}</h6>
                      <div className="d-flex justify-content-between align-items-center">
                        <button className="ed-addCart" onClick={addCart}>
                          加入購物車
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </>
  )
}

export default TopHitsMobile
