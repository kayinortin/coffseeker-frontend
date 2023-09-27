import React, { useState, useEffect } from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { GrAdd } from 'react-icons/gr'
import { AiOutlineMinus } from 'react-icons/ai'
import productsData from '@/data/cart/cart'

//購物清單總金額
function calculateTotal(cart) {
  const total = cart.reduce((accumulator, product) => {
    // 計算總金額，考慮產品數量和折扣價格
    return accumulator + product.quantity * product.discountPrice
  }, 0)
  return Math.round(total.toFixed(2))
}
//計算折扣
function applyDiscount(price, discountRate) {
  const parsedPrice = parseFloat(price)
  //檢查折扣是否為NaN
  if (isNaN(parsedPrice)) {
    return (0).toFixed(2)
  }
  const discountedPrice = parsedPrice * discountRate
  return Math.round(discountedPrice.toFixed(2))
}
//購物清單的
function CartList() {
  const [cart, setCart] = useState([]) //儲存購物車商品清單
  const [discountRate, setDiscountRate] = useState(0.85) //設定初始折扣率

  //初始化購物車，將商品與折扣價格一起放到購物車內
  const initCarDiscount = () => {
    const cartWithDiscount = productsData.map((product) => ({
      ...product,
      discountPrice: applyDiscount(product.price, discountRate), //更新每個產品的價格
    }))
    setCart(cartWithDiscount)
  }

  //discountRate狀態發生改變的時候，會觸發useEffect執行函式，因此得到更新後的折扣價格
  useEffect(() => {
    initCarDiscount()
  }, [discountRate])

  const handleQuantityChange = (productId, changeAmount) => {
    if (changeAmount === 0) {
      // 删除商品
      const updatedCart = cart.filter((product) => product.id !== productId)
      setCart(updatedCart)
    } else {
      // 更新商品数量和折扣价格
      const updatedCart = cart.map((product) => {
        if (product.id === productId) {
          const newQuantity = Math.max(1, product.quantity + changeAmount)
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
  }

  const isCartEmpty = cart.length === 0

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
        {isCartEmpty ? (
          <>
            <div className="text-center">
              <h3>您的購物車目前無商品</h3>
            </div>
          </>
        ) : (
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
        )}
      </div>
    </>
  )
}

export default CartList
