import { useEffect, useState } from 'react'
import style from '@/styles/_course.module.scss'
import Card from './Card'
import data from '@/data/course/course[pid].json'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
// import style from 'components/thumbs/thumbs.scss'

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'

// modules styles
// import style from './_gallery_swiper.module.scss'

const TopHits = ({ images = [], path = '' }) => {
  // 左邊圖片 slider
  const [thumbsSwiper, setThumbsSwiper] = useState(null)

  return (
    <div className={`${style['swiper-container']}`}>
      <Swiper
        style={
          {
            // '--swiper-navigation-color': '#fff',
            // '--swiper-pagination-color': '#fff',
          }
        }
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className={`${style['swiper-bg']}`}
      >
        {images.map((item, index) => {
          return (
            <SwiperSlide key={index} className={`${style['swiper-slide']}`}>
              <img src={item} />
            </SwiperSlide>
          )
        })}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={30}
        slidesPerView={5}
        watchSlidesProgress={true}
        modules={[Navigation, Thumbs]}
        className={`${style['swiper-sm']} d-none d-sm-flex`}
        loop={true}
        navigation={{ clickable: true }}
      >
        <SwiperSlide>
          {data.course.map((v, i) => {
            return (
              <Card
                key={i}
                name={v.name}
                id={v.id}
                image={v.image}
                price={v.price}
              />
            )
          })}
        </SwiperSlide>
        {/* {images.map((item, index) => {
          return (
            <SwiperSlide
              key={index}
              className={`${style['swiper-slide']} ${
                thumbsSwiper ? style['active'] : ''
              }`}
            >
              <img src={item} />
            </SwiperSlide>
          )
        })} */}
      </Swiper>
    </div>
  )
}

export default TopHits
