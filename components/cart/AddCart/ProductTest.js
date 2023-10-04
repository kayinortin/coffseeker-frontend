import React, { useState } from 'react'
import AddCartBtn from './AddCartBtn'

// 假设这是你的商品数据
const productData = [
  {
    id: 1,
    name: '商品1',
    price: 20,
  },
]

function ProductPage() {
  const [cart, setCart] = useState([])

  // 处理点击"加入购物车"按钮
  const handleAddToCart = (product) => {
    // 复制购物车数据，添加新商品
    const updatedCart = [...cart, product]
    setCart(updatedCart)
  }
}

export default function ProductTest() {
  return (
    <div>
      <h1>商品頁面</h1>
      <ul>
        {productData.map((product) => (
          <li key={product.id} className="fs-2 py-3">
            {product.name} - 价格：${product.price}
            <AddCartBtn
              productData={productData}
              ProductPage={ProductPage}
              handleAddToCart={handleAddToCart}
            />
            {/* <button onClick={() => handleAddToCart(product)}>加入购物车</button> */}
          </li>
        ))}
      </ul>
    </div>
  )
}
