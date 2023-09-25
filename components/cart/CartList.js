import React from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'

function CartList() {
  return (
    <>
      <table className={'carts'}>
        <thead className={'cartLabels'}>
          <tr>
            <th className={'align-middle text-start'} colSpan="2" scope="col">
              項目
            </th>
            <th className={'align-middle'} scope="col">
              數量
            </th>
            <th className={'align-middle'} scope="col">
              單價
            </th>
            <th className={'align-middle'} scope="col">
              折扣價
            </th>
            <th className={'align-middle'} scope="col">
              小計
            </th>
            <th className={'align-middle'} scope="col">
              刪除
            </th>
          </tr>
        </thead>
        <tbody className={'cartProducts'}>
          <tr className={''}>
            <td className={'align-middle'}>
              <img
                className={'img-fluid'}
                src="http://placehold.it/160x160"
                alt="product"
              />
            </td>
            <td className={'align-middle text-start'}>
              <div className={'fs-4 mb-2'}>商品名稱</div>
              <div className={'fs-6 '}>
                商品詳情商品詳情商品詳情商品詳情商品詳情商品詳情商品詳情商品詳情商品詳情商品詳情商品詳情商品詳情商品詳情商品詳情
              </div>
            </td>
            <td className={'align-middle  quantity'} role="gruup">
              <div className={'btn-group'}>
                <button
                  type="button"
                  value="+"
                  className={'btn quantityMinus'}
                  id={'quantityMinus'}
                >
                  -
                </button>
                <input
                  className={'form-control'}
                  type="text"
                  name="qulity"
                  min="0"
                  value="0"
                />
                <button
                  type="button"
                  value="-"
                  className={'btn quantityAdd'}
                  id={'quantityAdd'}
                >
                  +
                </button>
              </div>
            </td>
            <td className={'align-middle '}>$999</td>
            <td className={'align-middle'}>$900</td>
            <td className={'align-middle'}>$900</td>
            <td className={'align-middle'}>
              <RiDeleteBin6Line className={'trash'} />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default CartList
