import React, { useState, useEffect } from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { GrAdd } from 'react-icons/gr'
import { AiOutlineMinus } from 'react-icons/ai'
import productsData from '@/data/cart/cart'
import CourseData from '@/data/course/course'
import Lottie from 'react-lottie-player/dist/LottiePlayerLight'

function calculateTotal(cart) {
  const total = cart.reduce((accumulator, product) => {
    return accumulator + product.quantity * product.discountPrice
  }, 0)
  return Math.round(total.toFixed(2))
}

function applyDiscount(price, discountRate) {
  const parsedPrice = parseFloat(price)
  if (isNaN(parsedPrice)) {
    return (0).toFixed(2)
  }
  const discountedPrice = parsedPrice * discountRate
  return Math.round(discountedPrice.toFixed(2))
}

function CartList() {
  const [cart, setCart] = useState([])
  const [discountRate, setDiscountRate] = useState(0.85)

  const initCartWithDiscount = () => {
    const cartWithDiscount = productsData.map((product) => ({
      ...product,
      discountPrice: applyDiscount(product.price, discountRate),
    }))
    setCart(cartWithDiscount)
  }

  useEffect(() => {
    initCartWithDiscount()
  }, [discountRate])

  const handleQuantityChange = (productId, changeAmount) => {
    if (changeAmount === 0) {
      const updatedCart = cart.filter((product) => product.id !== productId)
      setCart(updatedCart)
    } else {
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
    <tr key={product.id}>
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
            className={'quantityMinus'}
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
            className={'quantityAdd'}
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
      <td className={'align-middle productdelete pe-3'}>
        <button
          className={'btn deleteButton'}
          onClick={() => {
            handleQuantityChange(product.id, 0)
          }}
        >
          <RiDeleteBin6Line className={'trash'} />
        </button>
      </td>
    </tr>
  ))

  const courseItems = CourseData.map((course) => (
    <tr key={course.id}>
      <td className={'align-middle ps-3'}>
        <img
          className={'img-fluid'}
          src={`http://placehold.it/160x160?text=${course.name}`}
          alt={course.name}
        />
      </td>
      <td className={'align-middle text-start'}>
        <div className={'fs-5 mb-2'}>{course.name}</div>
        <div className={'description'}>{course.description}</div>
      </td>
      <td className={'align-middle quantity'} role="group">
        {/* 这里可以放课程的数量控制按钮 */}
      </td>
      <td className={'align-middle'}>${course.price.toFixed()}</td>
      <td className={'align-middle'}>${course.discountPrice}</td>
      <td className={'align-middle'}>
        ${(course.quantity * course.discountPrice).toFixed()}
      </td>
      <td className={'align-middle productdelete pe-3'}>
        <button
          className={'btn deleteButton'}
          onClick={() => {
            handleQuantityChange(course.id, 0)
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
            <div className="emptyContainer text-center">
              <img
                className="emptyCart"
                src="/cart-image/emptycart.svg"
                alt="購物車無商品"
              />
              <div className="emptyTitle">您的購物車目前無商品</div>
              <button type="button" className="btn goshop">
                <a href="/pages/product">前往商城</a>
              </button>
            </div>
          </>
        ) : (
          <>
            <table className={'products'}>
              <thead className={'productsLabels'}>
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
              <tbody className={'productsItem'}>{productItems}</tbody>
              <tfoot>
                <tr className="carttotal">
                  <td colSpan="5" className="text-end total">
                    總額：
                  </td>
                  <td className={'align-middle'}>${calculateTotal(cart)}</td>
                </tr>
              </tfoot>
            </table>
            <table className={'courses'}>
              <thead className={'coursesLabels'}>
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
              <tbody className={'coursesItem'}>{courseItems}</tbody>
              <tfoot>
                <tr className="carttotal">
                  <td colSpan="5" className="text-end total">
                    總額：
                  </td>
                  {/* 计算课程总价值 */}
                  <td className={'align-middle'}>
                    ${calculateTotal(CourseData)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </>
        )}
      </div>
    </>
  )
}

export default CartList
