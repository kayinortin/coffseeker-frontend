import React, { useState, useEffect } from 'react'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'

import { useCartList } from '@/context/cart'
import { useProducts } from '@/context/product'

export default function CartList({ step, handleNextStep, setStep }) {
  const { cartListData, setCartListData } = useCartList()
  const { productsData, setProductsData } = useProducts()

  // 購物車列表即時渲染
  useEffect(() => {
    const initialData = JSON.parse(localStorage.getItem('cartList'))
    if (initialData) {
      setCartListData(initialData)
    }

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
  //單一商品小計＝價格＊數量
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

  //商品小計
  const [totalPrice, setTotalPrice] = useState(0)
  useEffect(() => {
    const total = cartListData.reduce((total, product) => {
      const subtotal = productSubtotal(product)
      return total + subtotal
    }, 0)

    setTotalPrice(total)
  }, [cartListData])

  // 商品列表
  const productItems = cartListData.map((product) => (
    <tr key={product.id}>
      <td className="align-middle ps-3 imgContainer">
        <img
          className="img-fluid"
          src={`http://localhost:3005/uploads/${product.image_main}`}
          alt={product.image_main}
        />
      </td>
      <td className="align-middle text-start">
        <div className="fs-5 mb-2">{product.name}</div>
        <div className="description">{product.description}</div>
      </td>
      <td className="align-middle">{product.discountPrice}</td>
      <td className="align-middle quantity" role="group">
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
            className="form-control forminput"
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
      </td>
      <td className="align-middle">{productSubtotal(product)}</td>
      <td className="align-middle productdelete">
        <button
          className="btn deleteButton"
          onClick={() => {
            handleRemoveProduct(product.id)
          }}
        >
          <RiDeleteBin5Line className="trash" />
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
              <td className="align-middle pe-2">NT${totalPrice}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  )
}
