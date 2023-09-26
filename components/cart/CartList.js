import React, { useState } from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { GrAdd } from 'react-icons/gr'
import { AiOutlineMinus } from 'react-icons/ai'
import productsData from '@/data/cart/cart'

function CartList() {
  const [cart, setCart] = useState(productsData)

  const handleQuantityChange = (productId, changeAmount) => {
    if (changeAmount === 0) {
      // 删除商品
      const updatedCart = cart.filter((product) => product.id !== productId)
      setCart(updatedCart)
    } else {
      // 更新商品数量
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
  }

  const productItems = cart.map((product) => (
    <tr key={product.id} className="">
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
        <div className={'btn-group'}>
          <button
            type="button"
            className={'quantityMinus'} // -1
            onClick={() => {
              handleQuantityChange(product.id, -1)
            }}
          >
            <AiOutlineMinus />
          </button>
          <input
            className={'form-control forminput '}
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
            <GrAdd />
          </button>
        </div>
      </td>
      <td className={'align-middle'}>${product.price}</td>
      <td className={'align-middle'}>${product.discountPrice}</td>
      <td className={'align-middle cartdelete'}>
        <button
          className={'deleteButton'}
          onClick={() => {
            handleQuantityChange(product.id, 0) // 0 表示删除商品
          }}
        >
          <RiDeleteBin6Line className={'trash'} />
        </button>
      </td>
    </tr>
  ))

  return (
    <>
      <div className="cartlist">
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
      </div>
    </>
  )
}

export default CartList
