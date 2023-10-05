import React, { useState, useEffect, useContext } from 'react'
import { CartContext } from '@/context/CartContent'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { ProductList } from '@/pages/cart/copy-product-list'

function CartListCopy({ step, handleNextStep, setStep }) {
  const { cart } = useContext(CartContext)
  const [productData, setProductData] = useState([])

  useEffect(() => {
    const storedProductData = JSON.parse(localStorage.getItem('cartList'))
    if (storedProductData) {
      setProductData(storedProductData)
    }
    console.log(storedProductData)
    console.log('成功獲取資料')
  }, [])

  return (
    <>
      <table className="products">
        <thead className="productsLabels">
          <tr className="selectTr">
            <th
              className="align-middle text-start ps-4"
              colSpan="2"
              scope="col"
            >
              商品項目
            </th>
            <th className="align-middle" scope="col">
              單價
            </th>
            <th className="align-middle" scope="col">
              數量
            </th>
            <th className="align-middle" scope="col">
              小計
            </th>
            <th className="align-middle" scope="col">
              刪除
            </th>
          </tr>
        </thead>

        <tbody className="productsItem">
          {productData.map((product) => (
            <tr key={product.id}>
              <td className="align-middle ps-3 imgContainer">
                <img
                  className="img-fluid"
                  src={product.image}
                  alt={product.name}
                />
              </td>
              <td className="align-middle text-start">
                <div className="fs-5 mb-2">{product.name}</div>
                <div className="description">{product.description}</div>
              </td>
              <td className="align-middle">{product.price}</td>
              <td className="align-middle quantity" role="group">
                <div className="btn-group">
                  <button type="button" className="quantityMinus">
                    <AiOutlineMinus />
                  </button>
                  <input
                    className="form-control forminput"
                    type="text"
                    name="quantity"
                    min="0"
                    readOnly
                  />
                  <button type="button" className="quantityAdd">
                    <AiOutlinePlus />
                  </button>
                </div>
              </td>
              <td className="align-middle">{/* 计算小计 */}</td>
              <td className="align-middle productdelete">
                <button className={'btn deleteButton'}>
                  <RiDeleteBin5Line className={'trash'} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="productFoot">
          <tr className="productTotal">
            <td colSpan="5" className="text-end total">
              商品小計：
            </td>
            <td className="align-middle pe-2">NTD$</td>
          </tr>
        </tfoot>
      </table>
    </>
  )
}

export default CartListCopy
