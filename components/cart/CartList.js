import React, { useState, useEffect } from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { GrAdd } from 'react-icons/gr'
import { AiOutlineMinus } from 'react-icons/ai'
import productsData from '@/data/cart/cart'
import CourseData from '@/data/cart/course'

// 小计函式
function calculateTotal(cart) {
  const total = cart.reduce((accumulator, product) => {
    return accumulator + product.quantity * product.price
  }, 0)
  return Math.round(total.toFixed(2))
}

// 打折函式
function applyDiscount(price, discountRate) {
  const parsedPrice = parseFloat(price)
  if (isNaN(parsedPrice)) {
    return (0).toFixed(2)
  }
  const discountedPrice = parsedPrice * discountRate
  return Math.round(discountedPrice.toFixed(2))
}

// 全部購物車
function CartList() {
  const [productCart, setProductCart] = useState([])
  const [courseCart, setCourseCart] = useState([])
  const [discountRate, setDiscountRate] = useState(0.85)

  // 初始化商品購物車
  const initProductCart = () => {
    const cartWithDiscount = productsData.map((product) => ({
      ...product,
      discountPrice: applyDiscount(product.price, discountRate),
    }))
    setProductCart(cartWithDiscount)
  }

  // 初始化课程購物車
  const initCourseCart = () => {
    setCourseCart([...CourseData])
  }

  useEffect(() => {
    initProductCart()
    initCourseCart()
  }, [])

  const handleProductQuantityChange = (productId, changeAmount) => {
    if (changeAmount === 0) {
      const updatedCart = productCart.filter(
        (product) => product.id !== productId
      )
      setProductCart(updatedCart)
    } else {
      const updatedCart = productCart.map((product) => {
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
      setProductCart(updatedCart)
    }
  }

  //處理商品數量增減
  const handleCourseQuantityChange = (courseId, changeAmount) => {
    if (changeAmount === 0) {
      const updatedCart = courseCart.filter((course) => course.id !== courseId)
      setCourseCart(updatedCart)
    } else {
      const updatedCart = courseCart.map((course) => {
        if (course.id === courseId) {
          return {
            ...course,
            quantity: course.quantity + changeAmount,
          }
        }
        return course
      })
      setCourseCart(updatedCart)
    }
  }

  // 刪除一個商品
  const handleRemoveProduct = (productId) => {
    const updatedCart = productCart.filter((item) => item.id !== productId)
    setProductCart(updatedCart)
  }
  // 刪除一個課程
  const handleRemoveCourse = (courseId) => {
    const updatedCart = courseCart.filter((item) => item.id !== courseId)
    setCourseCart(updatedCart)
  }

  // 判斷商品購物車是否有無商品
  const isProductCartEmpty = productCart.length === 0
  // 判斷课程購物車是否有無课程
  const isCourseCartEmpty = courseCart.length === 0

  // 商品列表
  const productItems = productCart.map((product) => (
    <tr key={product.id}>
      <td className={'align-middle ps-3 imgContainer'}>
        <img
          className={'img-fluid'}
          src={`/cart-image/${product.image}`}
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
              handleProductQuantityChange(product.id, -1)
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
              handleProductQuantityChange(product.id, 1)
            }}
          >
            <GrAdd />
          </button>
        </div>
      </td>
      <td className={'align-middle'}>${product.price.toFixed()}</td>
      <td className={'align-middle'}>
        ${Math.round((product.quantity * product.price).toFixed())}
      </td>
      <td className={'align-middle productdelete'}>
        <button
          className={'btn deleteButton'}
          onClick={() => {
            handleRemoveProduct(product.id)
          }}
        >
          <RiDeleteBin6Line className={'trash'} />
        </button>
      </td>
    </tr>
  ))
  // 課程列表
  const courseItems = courseCart.map((course) => (
    <tr key={course.id}>
      <td className={'align-middle ps-3 imgContainer'}>
        <img
          className={'img-fluid'}
          src={`/cart-image/${course.image}`}
          alt={course.name}
        />
      </td>
      <td className={'align-middle text-start'}>
        <div className={'fs-5 mb-2'}>{course.name}</div>
        <div className={'description'}>{course.description}</div>
      </td>
      <td className={'align-middle'}>{course.quantity}</td>
      <td className={'align-middle'}>${course.price.toFixed()}</td>
      <td className={'align-middle productdelete'}>
        <button
          className={'btn deleteButton'}
          onClick={() => {
            handleRemoveCourse(course.id)
          }}
        >
          <RiDeleteBin6Line className={'trash'} />
        </button>
      </td>
    </tr>
  ))

  // 商品小計金額
  // const productTotal = calculateTotal(productCart)
  const productTotal = productCart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  )
  // 課程小計金額
  const courseTotal = courseCart.reduce(
    (total, course) => total + course.price * course.quantity,
    0
  )

  return (
    <>
      <div className="cartlist">
        {isProductCartEmpty && isCourseCartEmpty ? (
          <>
            {/* 如果商品與課程都沒有商品清單 */}
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
            {/* 商品表格 */}
            <table className={'products'}>
              {/* 商品表格的表头 */}
              <thead className={'productsLabels'}>
                <tr>
                  <th
                    className={'align-middle text-start ps-4'}
                    colSpan="2"
                    scope="col"
                  >
                    商品項目 ({productItems.length})
                  </th>
                  <th className={'align-middle'} scope="col">
                    數量
                  </th>
                  <th className={'align-middle'} scope="col">
                    單價
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
                    商品小計：
                  </td>
                  <td className={'align-middle pe-2'}>
                    NTD${Math.round(productTotal.toFixed())}
                  </td>
                </tr>
              </tfoot>
            </table>
            {/* 课程表格 */}
            <table className={'courses'}>
              {/* 课程表格的表头 */}
              <thead className={'coursesLabels'}>
                <tr>
                  <th
                    className={'align-middle text-start ps-4'}
                    colSpan="2"
                    scope="col"
                  >
                    課程項目 ({courseItems.length})
                  </th>
                  <th className={'align-middle'} scope="col">
                    數量
                  </th>
                  <th className={'align-middle'} scope="col">
                    單價
                  </th>
                  <th className={'align-middle'} scope="col">
                    刪除
                  </th>
                </tr>
              </thead>
              <tbody className={'coursesItem'}>{courseItems}</tbody>
              <tfoot>
                <tr className="carttotal">
                  <td colSpan="4" className="text-end total">
                    課程小計：
                  </td>
                  <td className={'align-middle pe-2'}>
                    NTD${Math.round(courseTotal.toFixed(2))}
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
