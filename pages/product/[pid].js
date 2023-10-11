import React from 'react'
import { useRouter } from 'next/router'

import ProductDetailDesktop from '@/components/product/productDetailDesktop'

export default function ProductDetail() {
  const router = useRouter()
  const { pid } = router.query

  return (
    <>
      <div className="d-none d-sm-block">
        <ProductDetailDesktop pid={pid} />
      </div>
    </>
  )
}
