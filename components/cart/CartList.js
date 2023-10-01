import React, { useState, useEffect } from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { GrAdd } from 'react-icons/gr'
import { AiOutlineMinus } from 'react-icons/ai'
import productsData from '@/data/cart/cart'
import CourseData from '@/data/cart/course'

function CartList() {
  const [productCart, setProductCart] = useState([])
  const [courseCart, setCourseCart] = useState([])
  const [selectAllProducts, setSelectAllProducts] = useState(false)
  const [selectAllCourses, setSelectAllCourses] = useState(false)

  // 初始化商品購物車
  const initProductCart = () => {
    setProductCart([...productsData])
  }

  // 初始化课程購物車
  const initCourseCart = () => {
    setCourseCart([...CourseData])
  }

  //初次進入購物車狀態
  useEffect(() => {
    initProductCart()
    initCourseCart()

    // 預設已選擇所有商品
    const updatedProductCart = productsData.map((product) => ({
      ...product,
      selected: true,
    }))
    setProductCart(updatedProductCart)

    // 預設已選擇所有課程
    const updatedCourseCart = CourseData.map((course) => ({
      ...course,
      selected: true,
    }))
    setCourseCart(updatedCourseCart)
    //預設全選
    setSelectAllProducts(true)
    setSelectAllCourses(true)
  }, [])

  // 處理商品數量增減
  const handleQuantityChange = (productId, changeAmount) => {
    if (changeAmount === 0) {
      const updatedCart = productCart.filter(
        (product) => product.id !== productId
      )
      setProductCart(updatedCart)
    } else {
      const updatedCart = productCart.map((product) => {
        if (product.id === productId) {
          const newQuantity = Math.max(1, product.quantity + changeAmount)
          const newPrice = product.price * newQuantity
          return {
            ...product,
            quantity: newQuantity,
            price: newPrice,
          }
        }
        return product
      })
      setProductCart(updatedCart)
    }
  }

  // 刪除一個商品/課程
  const handleRemoveProduct = (productId) => {
    const updatedCart = productCart.filter((item) => item.id !== productId)
    setProductCart(updatedCart)
  }
  const handleRemoveCourse = (courseId) => {
    const updatedCart = courseCart.filter((item) => item.id !== courseId)
    setCourseCart(updatedCart)
  }

  // 切換單個商品的選擇狀態
  const handleToggleProductSelection = (productId) => {
    const updatedCart = productCart.map((product) => {
      if (product.id === productId) {
        return {
          ...product,
          selected: !product.selected,
        }
      }
      return product
    })
    setProductCart(updatedCart)

    const allProductsSelected = updatedCart.every((product) => product.selected)
    setSelectAllProducts(allProductsSelected)
  }
  const handleToggleCourseSelection = (courseId) => {
    const updatedCart = courseCart.map((course) => {
      if (course.id === courseId) {
        return {
          ...course,
          selected: !course.selected,
        }
      }
      return course
    })
    setCourseCart(updatedCart)

    const allCoursesSelected = updatedCart.every((course) => course.selected)
    setSelectAllCourses(allCoursesSelected)
  }

  // 切換所有選擇狀態
  const handleToggleSelectAllProducts = () => {
    const updatedProductCart = productCart.map((product) => ({
      ...product,
      selected: !selectAllProducts,
    }))
    setProductCart(updatedProductCart)
    setSelectAllProducts(!selectAllProducts)
  }
  const handleToggleSelectAllCourses = () => {
    const updatedCourseCart = courseCart.map((course) => ({
      ...course,
      selected: !selectAllCourses,
    }))
    setCourseCart(updatedCourseCart)
    setSelectAllCourses(!selectAllCourses)
  }

  //判斷購物車是否為空
  const isProductCartEmpty = productCart.length === 0
  const isCourseCartEmpty = courseCart.length === 0

  // 商品列表
  const productItems = productCart.map((product) => (
    <tr key={product.id}>
      <td className={'align-middle'}>
        <input
          type="checkbox"
          checked={product.selected}
          onChange={() => handleToggleProductSelection(product.id)}
        />
      </td>
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
      <td className={'align-middle'}>${product.price}</td>
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
      <td className={'align-middle'}>${product.price * product.quantity}</td>
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
      <td className={'align-middle'}>
        <input
          type="checkbox"
          checked={course.selected}
          onChange={() => handleToggleCourseSelection(course.id)}
        />
      </td>
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
      <td className={'align-middle'}>${course.price}</td>
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
  const selectedProductTotal = productCart.reduce((total, product) => {
    if (product.selected) {
      return total + product.price * product.quantity
    }
    return total
  }, 0)

  // 課程小計金額
  const selectedCourseTotal = courseCart.reduce((total, course) => {
    if (course.selected) {
      return total + course.price * course.quantity
    }
    return total
  }, 0)

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
            {productItems.length > 0 && (
              <table className={'products'}>
                {/* 商品表格的表頭 */}
                <thead className={'productsLabels'}>
                  <tr>
                    <th className={'align-middle'} scope="col">
                      <input
                        type="checkbox"
                        checked={selectAllProducts}
                        onChange={() => handleToggleSelectAllProducts()}
                      />
                    </th>
                    <th
                      className={'align-middle text-start ps-4'}
                      colSpan="2"
                      scope="col"
                    >
                      商品項目 ({productItems.length})
                    </th>
                    <th className={'align-middle'} scope="col">
                      單價
                    </th>
                    <th className={'align-middle'} scope="col">
                      數量
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
                <tfoot className={'productFoot'}>
                  <tr className="productTotal">
                    <td colSpan="5" className="text-end total">
                      商品小計：
                    </td>
                    <td className={'align-middle pe-2'}>
                      NTD${selectedProductTotal}
                    </td>
                  </tr>
                </tfoot>
              </table>
            )}
            {/* 課程表格 */}
            {courseItems.length > 0 && (
              <table className={'courses'}>
                {/* 課程表格的表頭 */}
                <thead className={'coursesLabels'}>
                  <tr>
                    <th className={'align-middle'} scope="col">
                      <input
                        type="checkbox"
                        checked={selectAllCourses}
                        onChange={() => handleToggleSelectAllCourses()}
                      />
                    </th>
                    <th
                      className={'align-middle text-start ps-4'}
                      colSpan="2"
                      scope="col"
                    >
                      課程項目 ({courseItems.length})
                    </th>
                    <th className={'align-middle'} scope="col">
                      單價
                    </th>
                    <th className={'align-middle'} scope="col">
                      數量
                    </th>
                    <th className={'align-middle'} scope="col">
                      刪除
                    </th>
                  </tr>
                </thead>
                <tbody className={'coursesItem'}>{courseItems}</tbody>
                <tfoot>
                  <tr className="courseTotal">
                    <td colSpan="4" className="text-end total">
                      課程小計：
                    </td>
                    <td className={'align-middle pe-2'}>
                      NTD${selectedCourseTotal}
                    </td>
                  </tr>
                </tfoot>
              </table>
            )}
            <table className="selectContainer">
              <thead className="Labels">
                <tr>
                  <th className="align-middle" scope="col">
                    選擇送貨及付款方式
                  </th>
                </tr>
              </thead>
              <tbody className="selectItem">
                <tr>
                  <td className="align-middle py-4 px-2" scope="col">
                    <label for="deliveryLabel" className="deliveryLabel">
                      選擇運送方式：
                    </label>
                    <select
                      class="form-select"
                      id="deliveryLabel"
                      name="deliveryLabel"
                      aria-label="選擇運送方式"
                    >
                      <option selected>請選擇</option>
                      <option value="delivery">宅配</option>
                      <option value="711Store">7-11便利商店</option>
                      <option value="familyStore">全家便利商店</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td lassName="align-middle" scope="col">
                    <label for="paymentLabel">選擇付款方式：</label>
                    <select
                      className="form-select"
                      id="paymentLabel"
                      name="paymentLabel"
                      aria-label="選擇付款方式"
                    >
                      <option selected>請選擇</option>
                      <option value="creditCard">信用卡</option>
                      <option value="ATM">ATM轉帳</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
            <table className="paymentContainer">
              <thead className="Labels">
                <tr>
                  <th className="align-middle" scope="col">
                    付款資訊
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="label-item">
                      <label for="allProductsItems">商品</label>
                      <div className="value" name="allProductsItems">
                        5/項
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="label-item">
                      <label for="allPrdouctPrice">金額</label>
                      <div className="value" name="allPrdouctPrice">
                        $9999
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <div className="label-item">
                    <label for="deliveryPrice">運費</label>
                    <div className="value" name="deliveryPrice">
                      $60
                    </div>
                  </div>
                </tr>
                <tr>
                  <td>
                    <div className="label-item">
                      <label for="couponDiscount">優惠卷折扣</label>
                      <div className="value" name="couponDiscount">
                        -$360
                        <select
                          className="form-select"
                          id="coupon"
                          name="coupon"
                          aria-label="selectCoupon"
                        >
                          <option selected>請選擇</option>
                          <option value="1">優惠卷1</option>
                          <option value="2">優惠卷2</option>
                          <option value="3">優惠卷3</option>
                        </select>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td>
                    <hr />
                    <div className="label-item">
                      <label for="sumTotal">合計</label>
                      <div className="value" name="sumTotal">
                        $9999
                      </div>
                    </div>
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
