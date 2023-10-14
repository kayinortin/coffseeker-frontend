import React from 'react'

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

import PopularDataFetcher from '@/components/product/PopularDataFetcher'
import ProductTopHits from '@/components/product/productTopHits'

import { useProducts } from '@/context/product'

const TopHits = () => {
  const { productsData, setProductsData } = useProducts()

  return (
    <>
      <PopularDataFetcher />
      <h5 className="mt-4">相關商品</h5>
      <div className="my-4">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={25}
          slidesPerView={1}
          navigation
          autoplay={{ delay: 3000 }}
        >
          {productsData.map((product, i) => {
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
