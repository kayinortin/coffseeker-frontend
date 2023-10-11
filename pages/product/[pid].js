import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'


import ProductDetailMobile from '@/components/product/productDetailMobile'
import ProductDetailDesktop from '@/components/product/productDetailDesktop'

export default function ProductDetail() {
  const router = useRouter()
  const { pid } = router.query

  const [showModal, setShowModal] = useState(false)

  const handleOpenModal = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <>
      <div className="d-none d-sm-block">
        <ProductDetailDesktop pid={pid} />
      </div>
      <div className="d-block d-sm-none">
        <ProductDetailMobile pid={pid} />
      </div>
    </>
  )
}
