import React from 'react'

export default function AddCartBtn({
  productData,
  ProductPage,
  handleAddToCart,
}) {
  return (
    <>
      <button onClick={() => handleAddToCart(product)}>addCart</button>
    </>
  )
}
