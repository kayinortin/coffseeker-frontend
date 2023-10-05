import React, { useState, useEffect, useContext } from 'react'
import { CartContext } from '@/context/CartContent'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { ProductList } from '@/pages/cart/copy-product-list'

function CartListCopy({ step, handleNextStep, setStep }) {
  const { cart } = useContext(CartContext)
  const [productData, setProductData] = useState([])

  //進入購物車狀態，渲染localStorage裡的商品
  useEffect(() => {
    const storedProductData = JSON.parse(localStorage.getItem('cartList'))
    if (storedProductData) {
      setProductData(storedProductData)
    }
    console.log(storedProductData)
    console.log('成功獲取資料')
  }, [])

  // 處理商品數量增減
  const handleQuantityChange = (productId, changeAmount) => {
    const updatedProductData = productData.map((product) => {
      if (product.id === productId) {
        const newQuantity = Math.max(1, product.quantity + changeAmount)
        return {
          ...product,
          quantity: newQuantity,
        }
      }
      return product
    })
    setProductData(updatedProductData)
  }

  //單一商品小計＝價格＊數量
  const productSubtotal = (product) => {
    return product.price * product.quantity
  }
  //商品小計
  const productTotal = () => {
    return productData.reduce(
      (total, product) => total + productSubtotal(product),
      0
    )
  }

  // 商品列表
  const productItems = productData.map((product) => (
    <tr key={product.id}>
      <td className="align-middle ps-3 imgContainer">
        <img
          className="img-fluid"
          src={`http://localhost:3005/uploads/${product.image}`}
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
          <button
            type="button"
            className="quantityMinus"
            onClick={() => {
              handleQuantityChange(product.id, -1)
            }}
          >
            <AiOutlineMinus />
          </button>
          <input
            className="form-control forminput"
            type="text"
            name="quantity"
            min="0"
            value={product.quantity}
            readOnly
          />
          <button
            type="button"
            className="quantityAdd"
            onClick={() => {
              handleQuantityChange(product.id, 1)
            }}
          >
            <AiOutlinePlus />
          </button>
        </div>
      </td>
      <td className="align-middle">{productSubtotal(product)}</td>
      <td className="align-middle productdelete">
        <button className={'btn deleteButton'}>
          <RiDeleteBin5Line className={'trash'} />
        </button>
      </td>
    </tr>
  ))

  return (
    <>
      <div className="newcartlist">
        <table className="products">
          <thead className="productsLabels">
            <tr className="selectTr">
              <th
                className="align-middle text-start ps-4"
                colSpan="2"
                scope="col"
              >
                商品項目({productItems.length})
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
          <tbody className="productsItem">{productItems}</tbody>
          <tfoot className="productFoot">
            <tr className="productTotal">
              <td colSpan="5" className="text-end total">
                商品小計：
              </td>
              <td className="align-middle pe-2">NTD${productTotal()}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  )
}

export default CartListCopy
