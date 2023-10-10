import React, { useEffect, useState } from 'react'
import { useAuthJWT } from '@/context/useAuthJWT'

function Checkout({ step, handleNextStep, setStep }) {
  const [isOpen, setIsOpen] = useState(false)
  const [checkoutData, setCheckoutData] = useState(null)
  const [isInfoVisible, setIsInfoVisible] = useState(false)

  //會員資料
  const { authJWT } = useAuthJWT()
  const userData = authJWT.userData

  //localStorage checkoutData
  useEffect(() => {
    const checkoutData = JSON.parse(localStorage.getItem('checkoutData'))
    if (checkoutData) {
      setCheckoutData(checkoutData)
    }
  }, [])

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
  //查看/關閉商品
  const handleToggleProducts = () => {
    setIsOpen(!isOpen)
  }
  //購物車商品即時渲染
  const cartItems = JSON.parse(localStorage.getItem('cartList'))
  cartItems.forEach((product) => {
    console.log(product)
  })
  //單一商品小計＝特價價格＊數量
  function productSubtotal(product) {
    return product.discountPrice * product.amount
  }
  //商品共計
  let totalPrice = 0
  cartItems.forEach((product) => {
    totalPrice += productSubtotal(product)
  })

  //收件人與會員相符
  const handleCheckboxChange = (e) => {
    setIsInfoVisible(e.target.checked)
  }

  const discountAmount = checkoutData ? checkoutData.discountAmount : 0 // 默认为0
  const totalProductCount = checkoutData ? checkoutData.totalProductCount : 0
  const deliveryPrice = checkoutData ? checkoutData.deliveryPrice : 0
  const totalAmount = checkoutData ? checkoutData.totalAmount : 0

  //商品列表
  const productItems = cartItems.map((product) => (
    <div key={product.id} className="productwrap row py-3">
      <div className="imgContainer col-lg-2 col-sm-3 ">
        <img
          className="img-fluid"
          src={`http://localhost:3005/uploads/${product.image_main}`}
          alt={product.image_main}
        />
      </div>
      <div className="productContent col-lg-10 col-sm-9 text-start">
        <div className="topDetails d-flex justify-content-between ">
          <div className="details">
            <div className="productTitle lh-sm pb-3">{product.name}</div>
            <div className="productDescription lh-base pb-5">
              {product.description}
            </div>
          </div>
        </div>
        <div className="productPrice text-end pb-3 align-items-center">
          <div className="price d-inline text-decoration-line-through fs-6 pe-2">
            ${product.price}
          </div>
          <div className="discountPrice d-inline fs-5">
            ${product.discountPrice}
          </div>
          <div className="discountPrice  d-inline fs-5"> x{product.amount}</div>
        </div>
        <div className="productQuantityTotal text-end ">
          <div className="productSubtotal d-inline text-end fs-5 fw-bolder">
            ${productSubtotal(product)}
          </div>
        </div>
      </div>
    </div>
  ))

  return (
    <>
      <div className="checkout">
        <div className="expandProducts">
          <hr className="border-1 opacity-100" />
          <div className={`checkoutProducts ${isOpen ? 'open' : 'close'}`}>
            <div className="closeProducts text-center">
              <h3>合計: NTD$9999 </h3>
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
                  {/* 購物車 */}
                  <div className="productscart col-lg-9">
                    <div className="products container">{productItems}</div>
                    <div className="productsFoot text-end fw-bolder fs-5 py-3">
                      商品共計 ${totalPrice}
                    </div>
                  </div>
                  {/* 資訊 */}
                  <div className="infoWrap col-lg-3">
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
                          <div className="payText">${totalPrice}</div>
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
            <div className="memberWrap col-lg-6 px-4">
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
                    value={isInfoVisible ? userData.username : ''}
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
                    value={isInfoVisible ? userData.phone : ''}
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
                    value={isInfoVisible ? userData.address : ''}
                  />
                </div>
              </div>
            </div>
            {/* 付款資料 */}
            <div className="cardWrap col-lg-6 px-4">
              <div className="labels">付款資料</div>
              <div className="payInfo">
                <div className="cardInfo">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="卡號"
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
                    type="number"
                    class="form-control"
                    placeholder="有效期限（ＭＭ/YY）"
                    aria-label="CardDate"
                    aria-describedby="addon-wrapping"
                  />
                </div>
                <div className="cardInfo">
                  <input
                    type="number"
                    class="form-control"
                    placeholder="安全碼"
                    aria-label="securityCode"
                    aria-describedby="addon-wrapping"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex btngroup my-5">
          <button
            className="btn backStep w-100 fw-medium lh-base"
            onClick={handleCheckout}
          >
            上一步
          </button>
          <button
            className="btn sendOrder w-100 fw-medium lh-base"
            onClick={() => setStep(3)}
          >
            送出訂單
          </button>
        </div>
      </div>
    </>
  )
}

export default Checkout
