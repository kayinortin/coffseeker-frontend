import React from 'react'

function Checkout({ step, handleNextStep, setStep, productCart, courseCart }) {
  //按鈕上一步 //按鈕送出訂單
  const handleCheckout = () => {
    if (step === 2) {
      setStep(1)
    } else {
      if (handleNextStep) {
        handleNextStep() // 否则执行下一步操作
      }
    }
  }

  return (
    <>
      <div className="checkout">
        <hr />
        <div className="text-center expandProducts">
          <div className="allProducts my-4">
            <h3>合計: NTD$9999 </h3>
            <button className="btn btngroup mt-3">查看商品</button>
          </div>
        </div>
        <hr />
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
            取消
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
