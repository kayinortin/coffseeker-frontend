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
      <hr />
      <div className="checkout text-center">
        <div className="Expandproduct my-4">
          <h3>合計: NTD$9999 </h3>
          <button className="btn btn-info mt-3">查看商品</button>
        </div>
      </div>
      <hr />
      <div className="d-flex memberItems mt-5">
        {/* 收件人資料 */}
        <table className="memberContainer">
          <thead className="Labels">
            <tr>
              <th className="align-middle" scope="col">
                收件人資料
              </th>
            </tr>
          </thead>
          <tbody className="memberbody">
            <tr>
              <td
                className="align-middle memberContainer w-100 mt-3"
                scope="col"
              >
                <label className="inputTitle fs-5 fw-bolder">
                  送貨方式：<span>宅配</span>
                </label>
              </td>
            </tr>
            <tr>
              <td className="align-middle memberContainer w-100 " scope="col">
                <input type="checkbox" className="tick me-2" />
                <label className="inputTitle">收件人姓名與會員資料相符</label>
              </td>
            </tr>
            <tr>
              <td className="align-middle memberContainer w-100" scope="col">
                <label className="inputTitle">收件人名稱</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="輸入名稱"
                  aria-label="Username"
                  aria-describedby="addon-wrapping"
                />
              </td>
            </tr>
            <tr>
              <td className="align-middle memberContainer w-100" scope="col">
                <label className="inputTitle">收件人電話號碼</label>
                <input
                  type="number"
                  class="form-control"
                  placeholder="輸入電話號碼"
                  aria-label="Username"
                  aria-describedby="addon-wrapping"
                />
              </td>
            </tr>
            <tr>
              <td
                className="align-middle memberContainer w-100 mb-3"
                scope="col"
              >
                <label className="inputTitle">配送地址</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="輸入地址"
                  aria-label="Username"
                  aria-describedby="addon-wrapping"
                />
              </td>
            </tr>
          </tbody>
          <tfoot></tfoot>
        </table>
        {/* 付款資料 */}
        <table className="memberContainer">
          <thead className="Labels">
            <tr>
              <th className="align-middle" scope="col">
                付款資料
              </th>
            </tr>
          </thead>
          <tbody className="memberbody">
            <tr>
              <td
                className="align-middle memberContainer w-100 mt-3"
                scope="col"
              >
                <label className="inputTitle fs-5 fw-bolder">
                  付款方式：<span>信用卡</span>
                </label>
              </td>
            </tr>
            <tr>
              <td className="align-middle memberContainer w-100" scope="col">
                <input
                  type="text"
                  class="form-control"
                  placeholder="卡號"
                  aria-label="CardNumber"
                  aria-describedby="addon-wrapping"
                />
              </td>
            </tr>
            <tr>
              <td className="align-middle memberContainer w-100" scope="col">
                <input
                  type="number"
                  class="form-control"
                  placeholder="持卡人姓名"
                  aria-label="Cardname"
                  aria-describedby="addon-wrapping"
                />
              </td>
            </tr>
            <tr>
              <td className="align-middle memberContainer w-100" scope="col">
                <input
                  type="text"
                  class="form-control"
                  placeholder="有效期限（ＭＭ/YY）"
                  aria-label="CardDate"
                  aria-describedby="addon-wrapping"
                />
              </td>
            </tr>
            <tr>
              <td className="align-middle memberContainer w-100" scope="col">
                <input
                  type="text"
                  class="form-control"
                  placeholder="安全碼"
                  aria-label="securityCode"
                  aria-describedby="addon-wrapping"
                />
              </td>
            </tr>
          </tbody>
          <tfoot></tfoot>
        </table>
      </div>
      <div className="d-flex btngroup my-5">
        <button className="btn backStep w-100 fw-bold" onClick={handleCheckout}>
          取消
        </button>
        <button
          className="btn sendOrder w-100 fw-bold"
          onClick={() => setStep(3)}
        >
          送出訂單
        </button>
      </div>
    </>
  )
}

export default Checkout
