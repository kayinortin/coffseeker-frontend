import React, { useEffect, useState } from 'react'
import { useAuthJWT } from '@/context/useAuthJWT'
import axios from 'axios'
import { useCartList } from '@/context/cart'
import { useCartListCourse } from '@/context/cart_course'
import Head from 'next/head'
import Swal from 'sweetalert2'

function Checkout({ step, handleNextStep, setStep }) {
  const [isOpen, setIsOpen] = useState(false)
  const [checkoutData, setCheckoutData] = useState([])
  const [receiverName, setReceiverName] = useState('')
  const [receiverPhone, setReceiverPhone] = useState('')
  const [receiverAddress, setReceiverAddress] = useState('')
  const [isInfoVisible, setIsInfoVisible] = useState(false)

  //購物車商品即時渲染
  const cartData = JSON.parse(localStorage.getItem('cartList'))
  const courseData = JSON.parse(localStorage.getItem('cartList_course'))

  //checkoutData localStorage Data
  const totalProductCount = checkoutData ? checkoutData.totalProductCount : 0 //數量
  const allTotalPrice = checkoutData ? checkoutData.allTotalPrice : 0 //商品總價格
  const deliveryPrice = checkoutData ? checkoutData.deliveryPrice : 0 //運費價格
  const selectedCouponId = checkoutData ? checkoutData.selectedCouponId : 0 //折價卷id
  const discountAmount = checkoutData ? checkoutData.discountAmount : 0 //折扣價格
  const selectedDeliveryOption = checkoutData
    ? checkoutData.selectedDeliveryOption
    : ''
  const selectedPaymentOption = checkoutData
    ? checkoutData.selectedPaymentOption
    : ''
  const totalAmount = checkoutData ? checkoutData.totalAmount : 0 //最後合計金額

  //會員資料
  const { authJWT } = useAuthJWT()
  const userData = authJWT.userData

  //按鈕上一步 //按鈕送出訂單
  const handleCheckout = () => {
    if (step === 2) {
      setStep(1)
    } else {
      if (handleNextStep) {
        handleNextStep() // 否则執行下一步操作
      }
    }
  }

  //localStorage checkoutData
  useEffect(() => {
    const checkoutData = JSON.parse(localStorage.getItem('checkoutData')) || []
    if (checkoutData) {
      setCheckoutData(checkoutData)
    }
  }, [])

  //後端API
  function sendOrder(orderData) {
    return new Promise((resolve, reject) => {
      axios
        .post('http://localhost:3005/api/ordercart/neworder', orderData)
        .then((response) => {
          console.log('訂單送入後端成功', response.data)
          resolve()
        })
        .catch((error) => {
          console.error('訂單送入後端錯誤', error)
          reject(error)
        })
    })
  }

  const { cartListData, setCartListData } = useCartList()
  const { cartListData_course, setCartListData_course } = useCartListCourse()

  //送出訂單
  function handleSendOrder() {
    if (!isInfoVisible) {
      Swal.fire({
        icon: 'warning',
        iconColor: '#1C262C',
        title: '請填寫收件人資訊與付款資料',
        text: '很抱歉，如果您未填寫我們將無法為您送出訂單',
      })
    } else {
      const uniqueOrderNumber = generateOrderNumber()

      const orderList = {
        user_id: authJWT.userData.id,
        tracking_number: uniqueOrderNumber,
        subtotal: allTotalPrice,
        shipping_fee: deliveryPrice,
        discount_price: discountAmount,
        total_price: allTotalPrice - discountAmount + deliveryPrice,
        payment: selectedPaymentOption,
        delivery: selectedDeliveryOption,
        receiver_name: isInfoVisible ? userData.username : receiverName,
        receiver_phone: isInfoVisible ? userData.phone : receiverPhone,
        receiver_address: isInfoVisible ? userData.address : receiverAddress,
      }

      const orderProducts = cartData
        ? cartData.map((product) => {
            return {
              product_id: product.id,
              amount: product.amount,
              price: product.discountPrice,
            }
          })
        : []

      const orderCourses = courseData
        ? courseData.map((course) => {
            return {
              course_id: course.id,
              amount: 1,
              price: course.course_price,
            }
          })
        : []

      const orderData = {
        orderList,
        orderProducts,
        orderCourses,
      }

      sendOrder(orderData)
        .then(() => {
          //移除購物車數據
          localStorage.removeItem('cartList')
          localStorage.removeItem('cartList_course')
          //清空購物車數據
          setCartListData([])
          setCartListData_course([])

          //優惠卷狀態更新
          const usedCouponId = selectedCouponId
          // console.log(usedCouponId)
          axios
            .put(
              `http://localhost:3005/api/coupons/updatecoupon/${usedCouponId}`,
              {
                coupon_valid: 0,
              }
            )
            .then((response) => {
              console.log('優惠券已更新為不可用', response.data)
            })
            .catch((error) => {
              console.error('更新優惠券時出錯', error)
            })

          setStep(3)
        })
        .catch((error) => {
          console.error('發送訂單時出錯', error)
        })
    }
  }

  //訂單編號生成
  function generateOrderNumber() {
    // 獲取當前時間
    const now = new Date()
    const year = now.getFullYear()
    const month = (now.getMonth() + 1).toString().padStart(2, '0') // 月份從0開始，所以要加1
    const day = now.getDate().toString().padStart(2, '0')
    const hours = now.getHours().toString().padStart(2, '0')
    const minutes = now.getMinutes().toString().padStart(2, '0')
    const randomDigits = Math.floor(Math.random() * 1000)

    const orderNumber = `${year}${month}${day}${hours}${minutes}${randomDigits}`

    return orderNumber
  }

  //收件人與會員相符
  const handleCheckboxChange = (e) => {
    setIsInfoVisible(e.target.checked)
  }

  //查看/關閉商品
  const handleToggleProducts = () => {
    setIsOpen(!isOpen)
  }
  //單一商品小計＝特價價格＊數量
  function productSubtotal(product) {
    return product.discountPrice * product.amount
  }
  //商品共計
  let totalPrice = 0
  if (cartData) {
    cartData.forEach((product) => {
      totalPrice += productSubtotal(product)
    })
  }
  //課程共計
  let totalCoursePrice = 0
  if (courseData) {
    courseData.forEach((course) => {
      totalCoursePrice += course.course_price
    })
  }
  //商品列表
  const productItems = cartData
    ? cartData.map((product) => (
        <div key={product.id} className="productwrap row py-3">
          <div className="imgContainer col-lg-2 col-sm-3 p-2">
            <img
              className="img-fluid"
              src={`http://localhost:3005/uploads/${product.image_main}`}
              alt={product.image_main}
            />
          </div>
          <div className="productContent col-lg-10 col-sm-9 text-start">
            <div className="topDetails d-flex justify-content-between">
              <div className="details">
                <div className="productTitle lh-sm pb-1">{product.name}</div>
                <div className="productDescription lh-base">
                  {product.description}
                </div>
              </div>
            </div>
            <div className="productPrice text-end pt-2 align-items-center">
              <div className="price d-inline text-decoration-line-through fs-6 pe-2">
                ${product.price}
              </div>
              <div className="discountPrice d-inline fs-5">
                ${product.discountPrice}
              </div>
              <div className="discountPrice  d-inline fs-5">
                x{product.amount}
              </div>
            </div>
            <div className="productQuantityTotal text-end pt-2">
              <div className="productSubtotal d-inline text-end fs-5 fw-bolder">
                ${productSubtotal(product)}
              </div>
            </div>
          </div>
        </div>
      ))
    : []
  //課程列表
  const courseItems = courseData
    ? courseData.map((course) => (
        <div key={course.id} className="productwrap row py-3">
          <div className="imgContainer col-lg-2 col-sm-3 p-2">
            <img
              className="img-fluid"
              src={`http://localhost:3005/uploads/${course.course_image}`}
              alt={course.course_image}
            />
          </div>
          <div className="productContent col-lg-10 col-sm-9 text-start">
            <div className="topDetails d-flex justify-content-between">
              <div className="details">
                <div className="productTitle lh-sm pb-1">
                  {course.course_name}
                </div>
                <div className="productDescription lh-base py-1">
                  {course.course_description}
                </div>
              </div>
            </div>
            <div className="productPrice text-end align-items-cente pt-2">
              {/* <div className="price d-inline text-decoration-line-through fs-6 pe-2">
            ${course.course_price}
          </div> */}
              {/* <div className="discountPrice d-inline fs-5">
                ${course.course_price}
              </div>
              <div className="discountPrice  d-inline fs-5"> x1</div> */}
            </div>
            <div className="productQuantityTotal text-end pt-2">
              <div className="productSubtotal d-inline text-end fs-5 fw-bolder">
                ${course.course_price}
              </div>
            </div>
          </div>
        </div>
      ))
    : []

  return (
    <>
      <div>
        <Head>
          <title>購物車｜填寫地址與付款</title>
        </Head>
      </div>
      <div className="checkout">
        <div className="expandProducts">
          <hr className="border-1 opacity-100" />
          <div className={`checkoutProducts ${isOpen ? 'open' : 'close'}`}>
            <div className="closeProducts text-center">
              <h3 className="mt-5">合計: ${totalAmount} </h3>
              <button
                className="btn btngroup my-4"
                onClick={handleToggleProducts}
              >
                {isOpen ? '關閉商品' : '查看商品'}
              </button>
            </div>
            {isOpen && (
              <div className="openProducts container">
                <div className="row">
                  {/* 商品列表 */}
                  <div className="productscart col-lg-8">
                    {/* 咖啡列表 */}
                    {cartData && cartData.length > 0 && (
                      <div className="wrapcart">
                        <div className="labels">
                          商品項目({productItems.length})
                        </div>
                        <div className="products container">{productItems}</div>
                        <div className="productsFoot text-end fw-bolder fs-5 py-3">
                          商品共計 ${totalPrice}
                        </div>
                      </div>
                    )}
                    {/* 課程列表 */}
                    {courseData && courseData.length > 0 && (
                      <div className="wrapcart">
                        <div className="labels">
                          課程項目({courseItems.length})
                        </div>
                        <div className="products container">{courseItems}</div>
                        <div className="productsFoot text-end fw-bolder fs-5 py-3">
                          課程共計 ${totalCoursePrice}
                        </div>
                      </div>
                    )}
                  </div>
                  {/* 資訊 */}
                  <div className="infoWrap col-lg-4">
                    <div className="paymentWrap">
                      <div className="labels">付款資訊</div>
                      <div className="payItems">
                        <div className="items d-flex justify-content-between">
                          <div className="payTitle">數量</div>
                          <div className="payText">
                            共 {totalProductCount} /個
                          </div>
                        </div>
                        <div className="items d-flex justify-content-between">
                          <div className="payTitle">金額</div>
                          <div className="payText">${allTotalPrice}</div>
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
                          <div className="payText">${totalAmount}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <hr className="border-1 opacity-100" />
        </div>
        <div className="detailsInfo container">
          <div className="detailsWrap row">
            {/* 收件人資料 */}
            <div className="memberWrap col-lg-6">
              <div className="wrapcart">
                <div className="labels">收件人資料</div>
                <div className="memberInfo">
                  <div className="deliverInfo d-flex align-items-center">
                    <input
                      type="checkbox"
                      className="me-2"
                      onChange={handleCheckboxChange}
                      checked={isInfoVisible}
                    />
                    <div className="selectTitle">收件人姓名與會員資料相符</div>
                  </div>
                  <div className="deliverInfo">
                    <div className="inputTitle">收件人名稱</div>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="輸入名稱"
                      aria-label="Username"
                      aria-describedby="addon-wrapping"
                      value={isInfoVisible ? userData.username : receiverName}
                      onChange={(e) => {
                        setReceiverName(e.target.value)
                      }}
                    />
                  </div>
                  <div className="deliverInfo">
                    <div className="inputTitle">收件人電話號碼</div>
                    <input
                      type="number"
                      class="form-control"
                      placeholder="輸入電話號碼"
                      aria-label="Username"
                      aria-describedby="addon-wrapping"
                      value={isInfoVisible ? userData.phone : receiverPhone}
                      onChange={(e) => {
                        setReceiverPhone(e.target.value)
                      }}
                    />
                  </div>
                  <div className="deliverInfo">
                    <div className="inputTitle">配送地址</div>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="輸入地址"
                      aria-label="Username"
                      aria-describedby="addon-wrapping"
                      value={isInfoVisible ? userData.address : receiverAddress}
                      onChange={(e) => {
                        setReceiverAddress(e.target.value)
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* 付款資料 */}
            <div className="cardWrap col-lg-6">
              <div className="wrapcart">
                <div className="labels">付款資料</div>
                <div className="payInfo">
                  <div className="cardInfo">
                    <input
                      type="text"
                      class="form-control"
                      maxlength="19"
                      placeholder="信用卡號碼"
                      aria-label="CardNumber"
                      aria-describedby="addon-wrapping"
                    />
                  </div>
                  <div className="cardInfo">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="持卡人姓名"
                      aria-label="Cardname"
                      aria-describedby="addon-wrapping"
                    />
                  </div>
                  <div className="cardInfo">
                    <input
                      type="text"
                      class="form-control"
                      maxlength="7"
                      placeholder="有效期限（ＭＭ/YY）"
                      aria-label="CardDate"
                      aria-describedby="addon-wrapping"
                    />
                  </div>
                  <div className="cardInfo">
                    <input
                      type="number"
                      class="form-control"
                      maxlength="3"
                      placeholder="安全碼"
                      aria-label="securityCode"
                      aria-describedby="addon-wrapping"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="btngroup my-3 row px-3">
          <div className="col-6 col-lg-6 mb-3">
            <button
              className="btn backStep w-100 fw-medium lh-base"
              onClick={handleCheckout}
            >
              上一步
            </button>
          </div>
          <div className="col-6 col-lg-6 mb-3">
            <button
              className="btn sendOrder w-100 fw-medium lh-base"
              onClick={() => {
                handleSendOrder()
              }}
            >
              送出訂單
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Checkout
