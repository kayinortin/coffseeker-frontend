import React, { useState } from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { GrAdd } from 'react-icons/gr'
import { AiOutlineMinus } from 'react-icons/ai'
import productsData from '@/data/cart/cart'

function CartList() {
  const [cart, setCart] = useState(productsData)

  const handleQuantityChange = (productId, changeAmount) => {
    // 找到目标商品
    const updatedCart = cart.map((product) => {
      if (product.id === productId) {
        // 更新数量，确保不低于0
        const newQuantity = Math.max(1, product.quantity + changeAmount)

        // 计算新的价格和折扣价格，基于单个商品的原价的9折
        const basePrice = product.subtitle
        const newPrice = newQuantity * basePrice
        const newDiscountPrice = newQuantity * basePrice * 0.9

        return {
          ...product,
          quantity: newQuantity,
          price: newPrice,
          discountPrice: newDiscountPrice,
        }
      }
      return product
    })

    // 更新购物车状态
    setCart(updatedCart)
  }

  const productItems = cart.map((product) => (
    <tr key={product.id}>
      <td className={'align-middle'}>
        <img
          className={'img-fluid'}
          src={`http://placehold.it/160x160?text=${product.name}`}
          alt={product.name}
        />
      </td>
      <td className={'align-middle text-start'}>
        <div className={'fs-5 mb-2'}>{product.name}</div>
        <div className={'description'}>{product.description}</div>
      </td>
      <td className={'align-middle quantity'} role="group">
        <div className={'btn-group '}>
          <button
            type="button"
            className={'quantityMinus'} // -1
            onClick={() => {
              handleQuantityChange(product.id, -1)
            }}
          >
            <AiOutlineMinus className="btn-icon" />
          </button>
          <input
            className={'form-control'}
            type="text"
            name="quantity"
            min="0"
            value={product.quantity}
            readOnly
          />
          <button
            type="button"
            className={'quantityAdd'} // +1
            onClick={() => {
              handleQuantityChange(product.id, 1)
            }}
          >
            <GrAdd className="btn-icon" />
          </button>
        </div>
      </td>
      <td className={'align-middle'}>${product.price}</td>
      <td className={'align-middle'}>${product.discountPrice}</td>
      <td className={'align-middle'}>
        <RiDeleteBin6Line className={'trash'} />
      </td>
    </tr>
  ))

  return (
    <>
      <table className={'carts'}>
        <thead className={'cartLabels'}>
          <tr>
            <th className={'align-middle text-start'} colSpan="2" scope="col">
              項目
            </th>
            <th className={'align-middle'} scope="col">
              數量
            </th>
            <th className={'align-middle'} scope="col">
              單價
            </th>
            <th className={'align-middle'} scope="col">
              折扣價
            </th>
            <th className={'align-middle'} scope="col">
              刪除
            </th>
          </tr>
        </thead>
        <tbody className={'cartProducts'}>{productItems}</tbody>
      </table>
    </>
  )
}

export default CartList
