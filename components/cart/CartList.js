import React, { useState, useEffect } from 'react'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import productsData from '@/data/cart/cart'
import courseData from '@/data/cart/course'
import couponData from '@/data/cart/coupon'

function CartList() {
  const [productCart, setProductCart] = useState([]) //商品空購物車
  const [courseCart, setCourseCart] = useState([]) //課程空購物車
  const [selectAllProducts, setSelectAllProducts] = useState(false) //選擇所有商品
  const [selectAllCourses, setSelectAllCourses] = useState(false) //選擇所有課程
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState('') // 運送方式
  const [deliveryPrice, setDeliveryPrice] = useState(0) // 運費金額
  const [selectedCoupon, setSelectedCoupon] = useState('') //選取優惠卷
  const [discountAmount, setDiscountAmount] = useState(0) //優惠卷金額

  // 初始化商品購物車
  const initProductCart = () => {
    setProductCart([...productsData])
  }

  // 初始化课程購物車
  const initCourseCart = () => {
    setCourseCart([...courseData])
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
    const updatedCourseCart = courseData.map((course) => ({
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
          className="checkbox"
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
            <AiOutlinePlus />
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
          <RiDeleteBin5Line className={'trash'} />
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
          <RiDeleteBin5Line className={'trash'} />
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
  //商品與課程加總的小計金額
  const totalSelectedTotal = selectedProductTotal + selectedCourseTotal

  // 商品項目數量統計
  const selectedProductCart = productCart.filter(
    (product) => product.selected
  ).length
  const selectedCourseCart = courseCart.filter(
    (course) => course.selected
  ).length
  //總商品數量
  const totalSelectedItems = selectedProductCart + selectedCourseCart

  //處理優惠卷折扣
  const handleCouponChange = (couponCode) => {
    //選取的優惠卷
    setSelectedCoupon(couponCode)

    // 查找所選優惠券數據
    const selectedCouponData = couponData.find(
      (coupon) => coupon.coupon_code === couponCode
    )

    if (selectedCouponData) {
      if (selectedCouponData.coupon_type === 1) {
        // 百分比折扣
        const discountPercentage = selectedCouponData.discount_value / 100 //換算百分比
        const discountPrice = Math.round(
          totalSelectedTotal * discountPercentage
        ) //總額小計＊百分比折扣
        const discount = totalSelectedTotal - discountPrice //總額小計 - 總額折扣 ＝ 總折扣金額
        setDiscountAmount(discount)
      } else {
        // 固定金額折扣
        setDiscountAmount(selectedCouponData.discount_value)
      }
    } else {
      // 如果沒有選擇優惠券或找不到優惠券，則重置折扣金額
      setDiscountAmount(0)
    }
  }

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
            <div className="d-flex selectItems">
              {/* 選擇送貨及付款方式 */}
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
                    <td
                      className="align-middle selectContainer w-100"
                      scope="col"
                    >
                      <label for="deliveryLabel" className="selecTitle">
                        選擇運送方式：
                      </label>
                      <select
                        required
                        class="form-select"
                        id="deliveryLabel"
                        name="deliveryLabel"
                        aria-label="select"
                        value={selectedDeliveryOption}
                        onChange={(e) => {
                          const selectedOption = e.target.value
                          setSelectedDeliveryOption(selectedOption)

                          // 根據所選的運送方式更新運費
                          let updatedDeliveryPrice = 0
                          if (selectedOption === 'delivery') {
                            updatedDeliveryPrice = 60 // 宅配運費為60元
                          } else if (
                            selectedOption === '711Store' ||
                            selectedOption === 'familyStore'
                          ) {
                            updatedDeliveryPrice = 80 // 7-11或全家便利商店運費
                          }
                          setDeliveryPrice(updatedDeliveryPrice)
                        }}
                      >
                        <option value="">請選擇</option>
                        <option value="delivery">宅配 NT$60</option>
                        <option value="711Store">7-11取貨 NT$80</option>
                        <option value="familyStore">全家取貨 NT$80</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="align-middle selectContainer w-100"
                      scope="col"
                    >
                      <label for="paymentLabel" className="selecTitle">
                        選擇付款方式：
                      </label>
                      <select
                        required
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
              {/* 付款資訊 */}
              <table className="paymentContainer">
                <thead className="Labels">
                  <tr>
                    <th className="align-middle" scope="col">
                      付款資訊
                    </th>
                  </tr>
                </thead>
                <tbody className="paymentItem">
                  <tr>
                    <td className="align-middle selectContainer" scope="col">
                      <div className="label-item">
                        <label for="allProductsItems" className="selecTitle">
                          數量
                        </label>
                        <div className="" name="allProductsItems">
                          {totalSelectedItems}/項
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="align-middle selectContainer" scope="col">
                      <div className="label-item">
                        <label for="allPrdouctPrice">小計</label>
                        <div className="" name="allPrdouctPrice">
                          ${totalSelectedTotal}
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="align-middle selectContainer" scope="col">
                      <div className="label-item">
                        <label for="couponDiscount">優惠卷</label>
                        {/* <select
                          className="form-select"
                          id="coupon"
                          name="coupon"
                          aria-label="selectCoupon"
                          value={selectedCoupon}
                          onChange={(e) => setSelectedCoupon(e.target.value)}
                        >
                          <option value="">請選擇</option>
                          {couponData.map((coupon) => (
                            <option
                              key={coupon.couponid}
                              value={coupon.coupon_code}
                            >
                              {coupon.coupon_name}
                            </option>
                          ))}
                        </select> */}
                        <select
                          className="form-select"
                          id="coupon"
                          name="coupon"
                          aria-label="selectCoupon"
                          value={selectedCoupon}
                          onChange={(e) => handleCouponChange(e.target.value)}
                        >
                          <option value="">請選擇</option>
                          {couponData.map((coupon) => (
                            <option
                              key={coupon.couponid}
                              value={coupon.coupon_code}
                            >
                              {coupon.coupon_name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="align-middle selectContainer" scope="col">
                      <div className="label-item">
                        <label for="couponDiscount">優惠卷折扣</label>
                        <div className="" name="couponDiscount">
                          -${discountAmount}
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="align-middle selectContainer" scope="col">
                      <div className="label-item">
                        <label for="deliveryPrice">運費</label>
                        <div className="" name="deliveryPrice">
                          ${deliveryPrice}
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="align-middle px-3 py-0" scope="col">
                      <hr className="border-1 opacity-100" />
                    </td>
                  </tr>
                  <tr>
                    <td className="align-middle selectContainer" scope="col">
                      <div className="label-item">
                        <label for="sumTotal">合計</label>
                        <div className="fs-3 fw-bold" name="sumTotal">
                          ${totalSelectedTotal - discountAmount + deliveryPrice}
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="align-middle selectContainer" scope="col">
                      <button className="btn goCheckout">前往結賬</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default CartList
