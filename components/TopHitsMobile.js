import { useState, useEffect } from 'react'
import axios from 'axios'

import { Swiper, SwiperSlide } from 'swiper/react'
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/autoplay'

import ProductTopHits from '@/components/product/productTopHits'

const TopHits = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await axios.get(
          'http://localhost:3005/api/popular-products'
        )
        const products = productResponse.data.products
        setData(products)
      } catch (error) {
        console.error('資料獲取失敗:', error)
      }
    }
    fetchData()
  }, [])

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
        >
          {data.map((product, i) => {
            return (
              <SwiperSlide key={i}>
                <ProductTopHits key={product.id} product={product} />
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </>
  )
}

export default TopHits
