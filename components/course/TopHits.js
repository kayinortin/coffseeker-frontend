import Card from './Card'
import data from '@/data/course/course[pid].json'
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi'

import React, { useState } from 'react'
import { Controller } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/scss'
import 'swiper/scss/pagination'
import 'swiper/scss/navigation'
import style from '@/styles/_swiper.module.scss'

const TopHits = () => {
  // store swiper instances
  const [firstSwiper, setFirstSwiper] = useState(null)
  const [secondSwiper, setSecondSwiper] = useState(null)
  const newData = data.course

  return (
    // <div className="w-100">
    <Swiper spaceBetween={20} slidesPerView={3}>
      {newData.map((v, i) => {
        return (
          <SwiperSlide key={i} className={`${style['swiper-slide']}`}>
            <Card
              name={v.name}
              price={v.price}
              start_date={v.start_date}
              image={v.image}
              id={v.id}
            />
          </SwiperSlide>
        )
      })}
    </Swiper>
    // </div>

    //------------------------------------------------------
    // <div className="swiper">
    //   {/* <!-- Additional required wrapper --> */}
    //   <div className="swiper-wrapper">
    //     {/* <!-- Slides --> */}
    //     <div className="swiper-slide">Slide 1</div>
    //     <div className="swiper-slide">Slide 2</div>
    //     <div className="swiper-slide">Slide 3</div>
    //     ...
    //   </div>
    //   {/* <!-- If we need pagination --> */}
    //   <div className="swiper-pagination"></div>

    //   {/* <!-- If we need navigation buttons --> */}
    //   <div className="swiper-button-prev"></div>
    //   <div className="swiper-button-next"></div>

    //   {/* <!-- If we need scrollbar --> */}
    //   <div className="swiper-scrollbar"></div>
    // </div>
  )
}

export default TopHits
