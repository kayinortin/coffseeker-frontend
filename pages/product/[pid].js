import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import ProductDetailMobile from '@/components/product/productDetailMobile'
import ProductDetailDesktop from '@/components/product/productDetailDesktop'

export default function ProductDetail() {
  const router = useRouter()
  const { pid } = router.query
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // useEffect(() => {
  //   if (pid) {
  //     setShowModal(true);
  //   }
  // }, [pid]);

  return (
    <>
      <div className="d-none d-sm-block">
        <ProductDetailDesktop pid={pid} />
      </div>
      <div className="d-block d-sm-none">
        <Modal show={showModal} onHide={handleCloseModal}>
          <ProductDetailMobile pid={pid} />
        </Modal>
      </div>
    </>
  )
}
