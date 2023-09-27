import React, { useState } from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { GrAdd } from 'react-icons/gr'
import { AiOutlineMinus } from 'react-icons/ai'
import productsData from '@/data/cart/cart'

function calculateTotal(cart) {
  const total = cart.reduce((accumulator, product) => {
    return accumulator + product.quantity * product.discountPrice // 计算总价时考虑数量和折扣价格
  }, 0)
  return total.toFixed() // 保留两位小数
}

function applyDiscount(price, discountRate) {
  return price * discountRate
}

function CartList() {
  const [cart, setCart] = useState(productsData)
  const [discountRate, setDiscountRate] = useState(0.9) // 默认折扣为九折

  const handleQuantityChange = (productId, changeAmount) => {
    const updatedCart = cart.map((product) => {
      if (product.id === productId) {
        // 更新数量，确保不低于1
        const newQuantity = Math.max(1, product.quantity + changeAmount)

        // 计算新的折扣价格，基于单价和折扣率
        const newDiscountPrice = applyDiscount(product.price, discountRate)

        return {
          ...product,
          quantity: newQuantity,
          discountPrice: newDiscountPrice,
        }
      }
      return product
    })

    setCart(updatedCart)
  }

  const productItems = cart.map((product) => (
    <tr key={product.id} className="">
      <td className={'align-middle ps-3'}>
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
      <td className={'align-middle'}>${product.price.toFixed()}</td>
      <td className={'align-middle'}>${product.discountPrice.toFixed()}</td>
      <td className={'align-middle'}>
        ${(product.quantity * product.discountPrice).toFixed()}
      </td>
      <td className={'align-middle cartdelete pe-3'}>
        <button
          className={'btn deleteButton'}
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
              <th
                className={'align-middle text-start ps-4'}
                colSpan="2"
                scope="col"
              >
                項目
              </th>
              <th className={'align-middle'} scope="col">
                數量
              </th>
              <th className={'align-middle'} scope="col">
                單價
              </th>
              <th className={'align-middle'} scope="col">
                折扣
              </th>
              <th className={'align-middle'} scope="col">
                小計
              </th>
              <th className={'align-middle'} scope="col">
                刪除
              </th>
            </tr>
          </thead>
          {/* 產品列表 */}
          <tbody className={'cartProducts'}>{productItems}</tbody>
          {/* 總額 */}
          <tfoot>
            <tr className="carttotal">
              <td colSpan="5" className="text-end total">
                總額：
              </td>
              <td className={'align-middle'}>${calculateTotal(cart)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  )
}

export default CartList
