import React, { useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper/core'
import 'swiper/scss'
import 'swiper/scss/pagination'
import 'swiper/scss/navigation'

import ProductDataFetcher from '@/components/product/ProductDataFetcher'
import ProductTopHits from '@/components/product/productTopHits'

import { useProducts } from '@/context/product'

SwiperCore.use([Navigation])

const TopHits = () => {
  const { productsData, setProductsData } = useProducts()

  return (
    <>
      <ProductDataFetcher />
      <Swiper spaceBetween={20} slidesPerView={3} navigation>
        {productsData.map((product, i) => {
          return (
            <SwiperSlide key={i}>
              <ProductTopHits key={product.id} product={product} />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </>
  )
}

export default TopHits
