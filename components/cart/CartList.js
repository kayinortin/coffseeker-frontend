import React from 'react'

function CartList() {
  return (
    <>
      {' '}
      <table className={'carts'}>
        <thead className={'cartLabels'}>
          <tr>
            <th>項目</th>
            <th>單價</th>
            <th>折扣價</th>
            <th>小計</th>
            <th>刪除</th>
          </tr>
        </thead>
        <tbody className={'cartProduct'}>
          <tr>
            <td className={'item'}>
              <div className={'productImage'}>
                <img
                  src="http://placehold.it/160x160"
                  alt="product"
                  className={'productFrame'}
                />
              </div>
              <div className={'productDetail'}>
                <div className={'title'}>商品名稱</div>
                <div className={'describe'}>
                  商品詳情商品詳情商品詳情商品詳情商品詳情商品詳情商品詳情商品詳情商品詳情商品詳情商品詳情商品詳情商品詳情商品詳情
                </div>
              </div>
            </td>
            <td className={'OriginPrice'}>$999</td>
            <td className={'discountPrice'}>$900</td>
            <td className={'Subtotal'}>$900</td>
            <td className={'delete'}>刪除</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default CartList
