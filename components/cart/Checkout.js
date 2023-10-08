import React, { useEffect } from 'react'

function Checkout({ step, handleNextStep, setStep }) {
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

  // const [totalPrice, setTotalPrice] = useState(0)

  //購物車商品即時渲染
  const cartItems = JSON.parse(localStorage.getItem('cartList'))
  cartItems.forEach((product) => {
    console.log(product)
  })

  function productSubtotal(product) {
    return product.discountPrice * product.amount
  }

  //商品列表
  const productItems = cartItems.map((product) => (
    <div key={product.id} className="productwrap row py-3">
      <div className="imgContainer col-lg-5 col-sm-4 ">
        <img
          className="img-fluid"
          src={`http://localhost:3005/uploads/${product.image_main}`}
          alt={product.image_main}
        />
      </div>
      <div className="productContent col-lg-7 col-sm-8 text-start">
        <div className="topDetails d-flex pb-5 justify-content-between ">
          <div className="details">
            <div className="productTitle">{product.name}</div>
            <div className="productDescription">{product.description}</div>
          </div>
        </div>
        <div className="productPrice ">
          <div className="price text-decoration-line-through fs-6 pe-2">
            ${product.price}
          </div>
          <div className="discountPrice">{product.discountPrice}</div>
          <div className="discountPrice">{product.amount}</div>
          <div className="productSubtotal d-inline fs-4 fw-bolder">
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
          <div className="text-center checkoutProducts">
            <div className="closeProducts my-4">
              <h3>合計: NTD$9999 </h3>
              <button className="btn btngroup mt-3">查看商品</button>
            </div>
            <div className="openProducts">
              <div className="productscart col-lg-8 mb-3">
                <div className="products container text-center">
                  {productItems}
                </div>
                <div className="productsFoot text-end fw-bolder fs-4">
                  商品共計 ${totalPrice}
                </div>
              </div>
            </div>
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
                  <input type="checkbox" className="me-2" />
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
