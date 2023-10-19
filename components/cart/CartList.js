import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { useCartList } from '@/context/cart'
import { useCartListCourse } from '@/context/cart_course'
import { useAuthJWT } from '@/context/useAuthJWT'
import axios from 'axios'
import Head from 'next/head'
import Swal from 'sweetalert2'

export default function CartList({ step, handleNextStep, setStep }) {
  const { cartListData, setCartListData } = useCartList([]) //商品資料
  const { cartListData_course, setCartListData_course } = useCartListCourse([]) //課程資料
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState('') // 運送方式
  const [deliveryPrice, setDeliveryPrice] = useState(0) // 運費金額
  const [selectedPaymentOption, setSelectedPaymentOption] = useState('') // 付款方式
  const [selectedCoupon, setSelectedCoupon] = useState([]) //選取優惠卷
  const [selectedCouponId, setSelectedCouponId] = useState('') //選取優惠卷Id
  const [discountAmount, setDiscountAmount] = useState(0) //優惠卷金額
  const { authJWT } = useAuthJWT() //取userId

  //優惠卷API
  // const couponsDataFetch = async (userId) => {
  //   try {
  //     const localCoupons = JSON.parse(localStorage.getItem('userCoupons'))
  //     if (localCoupons) {
  //       setSelectedCoupon(localCoupons)
  //     } else {
  //       const couponResponse = await axios.get(
  //         `http://localhost:3005/api/coupons/userCoupons/${userId}`
  //       )
  //       const couponsData = couponResponse.data.orders
  //       setSelectedCoupon(Array.isArray(couponsData) ? couponsData : [])
  //       // 同時將數據保存在本地存儲
  //       localStorage.setItem('userCoupons', JSON.stringify(couponsData))
  //     }
  //   } catch (error) {
  //     console.error('資料獲取失敗:', error)
  //   }
  // }
  const couponsDataFetch = async (userId) => {
    try {
      const localCoupons = JSON.parse(localStorage.getItem('userCoupons'))
      if (localCoupons) {
        const validCoupons = localCoupons.filter(
          (coupon) => coupon.coupon_valid === 1
        )
        setSelectedCoupon(validCoupons)
      } else {
        const couponResponse = await axios.get(
          `http://localhost:3005/api/coupons/userCoupons/${userId}`
        )
        const couponsData = couponResponse.data.orders
        const validCoupons = couponsData.filter(
          (coupon) => coupon.coupon_valid === 1
        )
        setSelectedCoupon(Array.isArray(validCoupons) ? validCoupons : [])

        const validCouponsString = JSON.stringify(validCoupons)
        localStorage.setItem('userCoupons', validCouponsString)
      }
    } catch (error) {
      console.error('數據獲取失敗:', error)
    }
  }

  // 購物車列表即時渲染
  useEffect(() => {
    if (authJWT.isAuth) {
      const userId = authJWT.userData.id
      const localCoupons = JSON.parse(localStorage.getItem('userCoupons'))

      if (localCoupons && localCoupons.length > 0) {
        setSelectedCoupon(localCoupons)
      } else {
        couponsDataFetch(userId)
      }
    }

    const initialData = JSON.parse(localStorage.getItem('cartList'))
    const initialCourseData = JSON.parse(
      localStorage.getItem('cartList_course')
    )

    let courseData = initialCourseData
    if (initialCourseData && Array.isArray(initialCourseData)) {
      courseData = initialCourseData.map((item) => ({
        ...item,
        course_amount: 1,
      }))
    }

    setCartListData(initialData || [])
    setCartListData_course(courseData || [])

    const handleStorageChange = (e) => {
      if (e.key === 'cartList') {
        const updatedData = JSON.parse(e.newValue)
        setCartListData(updatedData)
      }
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])
  //前往結帳
  const handleCheckout = () => {
    if (!selectedDeliveryOption && !selectedPaymentOption) {
      Swal.fire({
        icon: 'warning',
        iconColor: '#1C262C',
        title: '請選擇運送與付款方式',
        text: '很抱歉，如果您未選擇我們將無法為您成立訂單',
      })
      return
    }

    if (!selectedDeliveryOption) {
      Swal.fire({
        icon: 'warning',
        iconColor: '#1C262C',
        title: '請選擇運送方式',
        text: '很抱歉，如果您未選擇我們將無法為您成立訂單',
      })
      return
    }

    if (!selectedPaymentOption) {
      Swal.fire({
        icon: 'warning',
        iconColor: '#1C262C',
        title: '請選擇付款方式',
        text: '很抱歉，如果您未選擇我們將無法為您成立訂單',
      })
      return
    }

    //創建訂單資料
    const checkoutData = {
      selectedDeliveryOption,
      deliveryPrice,
      selectedPaymentOption,
      selectedCouponId,
      discountAmount,
      totalProductCount,
      allTotalPrice,
      totalAmount: allTotalPrice - discountAmount + deliveryPrice,
    }
    //將訂單資料存入localStorage
    localStorage.setItem('checkoutData', JSON.stringify(checkoutData))
    //切換上面步驟
    if (handleNextStep) {
      handleNextStep(cartListData) // 調用父組件的處理函數，切換到下一步
    }
    setStep(2) // 切換到第三步
  }
  //處理折扣優惠卷
  const handleCouponChange = (couponId) => {
    const numCouponId = Number(couponId)
    // 找到選取的優惠卷
    setSelectedCouponId(numCouponId)
    // 查找所選優惠券數據
    const selectedCouponData = selectedCoupon.find(
      (coupon) => coupon.coupon_id === numCouponId
    )
    console.log(selectedCoupon)
    if (selectedCouponData) {
      if (selectedCouponData.discount_type === '百分比') {
        // 百分比折扣
        const discountPercentage = selectedCouponData.discount_value / 100
        const discountPrice = Math.round(allTotalPrice * discountPercentage)
        const discount = allTotalPrice - discountPrice
        setDiscountAmount(discount)
      } else if (selectedCouponData.discount_type === '金額') {
        // 固定金額折扣
        setDiscountAmount(selectedCouponData.discount_value)
      }
    } else {
      // 如果未選擇或未找到優惠券，則重置折扣金額
      setDiscountAmount(0)
    }
  }

  //根據user_id條件來呈現優惠卷選項
  // const renderCouponOptions = () => {
  //   const userId = getUserId() // 請使用實際的函數來獲取使用者的 ID
  //   return (
  //     <select
  //       className="form-select"
  //       id="coupon"
  //       name="coupon"
  //       aria-label="selectCoupon"
  //       value={selectedCouponId}
  //       onChange={(e) => handleCouponChange(e.target.value)}
  //     >
  //       <option value="">請選擇</option>
  //       {selectedCoupon.map(
  //         (coupon) =>
  //           // 新增條件以檢查 user_id 是否相符
  //           coupon.user_id === userId && (
  //             <option key={coupon.coupon_id} value={coupon.coupon_code}>
  //               {coupon.coupon_name}
  //             </option>
  //           )
  //       )}
  //     </select>
  //   )
  // }

  // 處理商品數量增減
  const handleamountChange = (productId, changeAmount) => {
    const updatedCartData = cartListData.map((product) => {
      if (product.id === productId) {
        const newamount = Math.max(1, product.amount + changeAmount)
        return {
          ...product,
          amount: newamount,
        }
      }
      return product
    })
    setCartListData(updatedCartData)
    localStorage.setItem('cartList', JSON.stringify(updatedCartData))
  }
  //單一商品小計＝特價價格＊數量
  const productSubtotal = (product) => {
    return product.discountPrice * product.amount
  }
  // 刪除一個商品
  const handleRemoveProduct = (productId) => {
    // localStorage 獲取目前的商品
    const storedProductData = JSON.parse(localStorage.getItem('cartList'))

    // 過濾出不包含要删除的商品
    const updatedCart = storedProductData.filter(
      (item) => item.id !== productId
    )
    // 更新購物車狀態
    setCartListData(updatedCart)

    // 更新localStorage數據
    localStorage.setItem('cartList', JSON.stringify(updatedCart))
  }
  //刪除一個課程
  const handleRemoveCourse = (courseId) => {
    // localStorage 獲取目前的商品
    const storedCourseData = JSON.parse(localStorage.getItem('cartList_course'))

    // 過濾出不包含要删除的商品
    const updatedCart = storedCourseData.filter((item) => item.id !== courseId)
    // 更新購物車狀態
    setCartListData_course(updatedCart)

    // 更新localStorage數據
    localStorage.setItem('cartList_course', JSON.stringify(updatedCart))
  }

  //商品小計
  const [totalPrice, setTotalPrice] = useState(0)
  useEffect(() => {
    const total = cartListData.reduce((total, product) => {
      const subtotal = productSubtotal(product)
      return total + subtotal
    }, 0)
    setTotalPrice(total)
  }, [cartListData])

  //課程小計
  const [courseTotalPrice, setCourseTotalPrice] = useState(0)
  useEffect(() => {
    const courseTotal = cartListData_course.reduce((total, course) => {
      return total + course.course_price
    }, 0)

    setCourseTotalPrice(courseTotal)
  }, [cartListData_course])

  const allTotalPrice = totalPrice + courseTotalPrice
  //數量總計
  const totalProductCount =
    cartListData.reduce((total, product) => total + product.amount, 0) +
    cartListData_course.length

  //商品列表
  const productItems = cartListData.map((product) => (
    <div key={product.id} className="productwrap row py-3">
      <div className="imgContainer col-lg-3 col-md-5 p-2">
        <div className="ratio ratio-1x1">
          <img
            className="img-fluid"
            src={`http://localhost:3005/uploads/${product.image_main}`}
            alt={product.image_main}
          />
        </div>
      </div>
      <div className="productContent col-lg-9 col-md-7 text-start">
        <div className="topDetails d-flex pb-5 justify-content-between">
          <div className="details d-inline pe-3">
            <div className="productTitle py-1 lh-sm">{product.name}</div>
            <div className="productDescription py-1 fw-medium lh-base">
              {product.description}
            </div>
          </div>
          <div className="d-inline productDelete">
            <button
              className="deleteButton"
              onClick={() => {
                handleRemoveProduct(product.id)
              }}
            >
              <RiDeleteBin5Line className="trash" />
            </button>
          </div>
        </div>
        <div className="productPrice fw-medium fs-5 ">
          <div className="price d-inline text-decoration-line-through fs-6 pe-2">
            ${product.price}
          </div>
          <div className="discountPrice d-inline ">
            ${product.discountPrice}
          </div>
        </div>
        <div className="productQuantityTotal pt-3 align-items-center">
          <div className="btn-group">
            <button
              type="button"
              className="quantityMinus"
              onClick={() => {
                handleamountChange(product.id, -1)
              }}
            >
              <AiOutlineMinus />
            </button>
            <input
              className="form-control forminput text-center"
              type="text"
              name="amount"
              min="0"
              value={product.amount}
              readOnly
            />
            <button
              type="button"
              className="quantityAdd"
              onClick={() => {
                handleamountChange(product.id, 1)
              }}
            >
              <AiOutlinePlus />
            </button>
          </div>
          <div className="productSubtotal d-inline fs-4 fw-bolder">
            ${productSubtotal(product)}
          </div>
        </div>
      </div>
    </div>
  ))

  //課程列表
  const courseItems = cartListData_course.map((course) => (
    <div key={course.id} className="productwrap row py-3">
      <div className="imgContainer col-lg-3 col-md-5 p-2">
        <div className="ratio ratio-1x1">
          <img
            className="img-fluid"
            src={`http://localhost:3005/uploads/${course.course_image}`}
            alt={course.course_image}
          />
        </div>
      </div>
      <div className="productContent col-lg-9 col-md-7 text-start">
        <div className="topDetails d-flex pb-5 justify-content-between">
          <div className="details d-inline pe-3">
            <div className="productTitle py-1 lh-sm">{course.course_name}</div>
            <div className="productDescription py-1 fw-medium lh-base">
              {course.course_description}
            </div>
          </div>
          <div className="d-inline productDelete">
            <button
              className="deleteButton"
              onClick={() => {
                handleRemoveCourse(course.id)
              }}
            >
              <RiDeleteBin5Line className="trash" />
            </button>
          </div>
        </div>
        <div className="productQuantityTotal justify-content-end">
          <div className="productSubtotal fs-4 fw-bolder">
            ${course.course_price}
          </div>
        </div>
      </div>
    </div>
  ))

  //購物車沒有商品
  if (cartListData.length === 0 && cartListData_course.length === 0) {
    return (
      <>
        <div>
          <Head>
            <title>購物車｜目前無商品</title>
          </Head>
        </div>
        <div className="cartlist">
          <div className="emptyContainer text-center">
            <img className="emptyCart" src="/bg1.png" alt="購物車無商品" />
            <div className="emptyTitle">您的購物車目前無商品</div>

            <Link href="/product">
              <button type="button" className="btn goshop">
                前往商城
              </button>
            </Link>
          </div>
        </div>
      </>
    )
  }

  //購物車有商品
  return (
    <>
      <div>
        <Head>
          <title>購物車｜查看您的商品</title>
        </Head>
      </div>
      <div className="cartlist container py-3">
        <div className="cartWrap row">
          {/* 商品表單 */}
          <div className="productscart col-lg-8">
            {/* 咖啡列表 */}
            {cartListData.length > 0 && (
              <div className="wrapcart">
                <div className="labels">商品項目({productItems.length})</div>
                <div className="products container text-center">
                  {productItems}
                </div>
                <div className="productsFoot text-end fw-bolder fs-4">
                  商品小計 ${totalPrice}
                </div>
              </div>
            )}
            {/* 課程列表 */}
            {cartListData_course.length > 0 && (
              <div className="wrapcart">
                <div className="labels">課程項目({courseItems.length})</div>
                <div className="products container text-center">
                  {courseItems}
                </div>
                <div className="productsFoot text-end fw-bolder fs-4">
                  課程小計 ${courseTotalPrice}
                </div>
              </div>
            )}
          </div>
          {/* 資訊表單 */}
          <div className="infos col-lg-4 mb-3">
            <div className="infoWrap column">
              {/* 選擇送貨及付款方式 */}
              <div className="selectWrap col-lg-12 mb-3">
                <div className="labels">選擇送貨及付款方式</div>
                <div className="infoItems pt-3">
                  <div className="selects">
                    <div className="selectTitle">選擇運送方式：</div>
                    <select
                      required
                      className="form-select"
                      id="deliveryLabel"
                      name="deliveryLabel"
                      aria-label="select"
                      value={selectedDeliveryOption}
                      onChange={(e) => {
                        const selectedOption = e.target.value
                        setSelectedDeliveryOption(selectedOption)

                        // 根據所選的運送方式更新運費
                        let updatedDeliveryPrice = 0
                        if (selectedOption === '宅配') {
                          updatedDeliveryPrice = 60 // 宅配運費為60元
                        } else if (
                          selectedOption === '7-11取貨' ||
                          selectedOption === '全家取貨'
                        ) {
                          updatedDeliveryPrice = 80
                        }
                        setDeliveryPrice(updatedDeliveryPrice)
                      }}
                    >
                      <option value="">請選擇</option>
                      <option value="宅配">宅配 NT$60</option>
                      <option value="7-11取貨">7-11取貨 NT$80</option>
                      <option value="全家取貨">全家取貨 NT$80</option>
                    </select>
                  </div>
                  <div className="selects">
                    <div className="selectTitle">選擇付款方式：</div>
                    <select
                      required
                      className="form-select"
                      id="paymentLabel"
                      name="paymentLabel"
                      aria-label="選擇付款方式"
                      value={selectedPaymentOption}
                      onChange={(e) => {
                        const selectedOption = e.target.value
                        setSelectedPaymentOption(selectedOption)
                      }}
                    >
                      <option value="">請選擇</option>
                      <option value="信用卡">信用卡</option>
                      <option value="ATM轉帳">ATM轉帳</option>
                    </select>
                  </div>
                </div>
              </div>
              {/* 付款資訊 */}
              <div className="paymentWrap col-lg-12">
                <div className="labels">付款資訊</div>
                <div className="payItems">
                  <div className="items d-flex justify-content-between">
                    <div className="payTitle">數量</div>
                    <div className="payText">共 {totalProductCount} 個商品</div>
                  </div>
                  <div className="items d-flex justify-content-between">
                    <div className="payTitle">金額</div>
                    <div className="payText">${allTotalPrice}</div>
                  </div>
                  <div className="items d-flex justify-content-between align-items-center">
                    <div className="payTitle">優惠卷</div>
                    <select
                      className="form-select payText w-75"
                      id="coupon"
                      name="coupon"
                      aria-label="selectCoupon"
                      value={selectedCouponId}
                      onChange={(e) => handleCouponChange(e.target.value)}
                    >
                      <option value="">請選擇</option>
                      {selectedCoupon.map((coupon) => (
                        <option key={coupon.coupon_id} value={coupon.coupon_id}>
                          {coupon.coupon_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="items d-flex justify-content-between">
                    <div className="payTitle">優惠卷折扣</div>
                    <div className="payText">-${discountAmount}</div>
                  </div>
                  <div className="items d-flex justify-content-between">
                    <div className="payTitle">運費</div>
                    <div className="payText">${deliveryPrice}</div>
                  </div>
                  <hr className="items border-1 opacity-100 m-0" />
                  <div className="items d-flex justify-content-between pb-3 fs-4 fw-bold">
                    <div className="payTitle">合計</div>
                    <div className="payText">
                      ${allTotalPrice - discountAmount + deliveryPrice}
                    </div>
                  </div>
                  <div className="items p-0">
                    <button className="btn goCheckout" onClick={handleCheckout}>
                      前往結帳
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
